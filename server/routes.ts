import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, type InsertProject } from "@shared/schema";
import { sendContactEmail } from "./email";
import { z } from "zod";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Quadratic01";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  private: boolean;
  fork: boolean;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API integration
  app.get("/api/projects", async (req, res) => {
    try {
      // First check if we have cached projects
      const cachedProjects = await storage.getAllProjects();
      
      // Fetch from GitHub API
      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App"
      };
      
      if (GITHUB_TOKEN) {
        headers["Authorization"] = `token ${GITHUB_TOKEN}`;
      }
      
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        { headers }
      );
      
      if (!response.ok) {
        console.error("GitHub API error:", response.status, response.statusText);
        // Return cached projects if API fails
        return res.json(cachedProjects);
      }
      
      const repos: GitHubRepo[] = await response.json();
      
      // Filter for personal projects (exclude forks and certain repo types)
      const personalProjects = repos.filter(repo => 
        !repo.private && 
        !repo.fork && 
        repo.name !== GITHUB_USERNAME && // Exclude profile README repo
        !repo.name.includes('config') && // Exclude config repos
        !repo.name.includes('template') // Exclude template repos
      );

      // Transform to our schema
      const projects: InsertProject[] = personalProjects
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          topics: repo.topics || [],
          created_at: new Date(repo.created_at),
          updated_at: new Date(repo.updated_at),
        }));
      
      // Update storage with fresh data
      const updatedProjects = await storage.updateProjects(projects);
      res.json(updatedProjects);
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Return cached projects on error
      const cachedProjects = await storage.getAllProjects();
      res.json(cachedProjects);
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);

      console.log("Contact form data:", contactData)
      
      // Send email notification
      try {
        await sendContactEmail({
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          subject: contactData.subject
        });
        console.log("Contact email sent successfully");
      } catch (emailError) {
        console.error("Failed to send contact email:", emailError);
        // Don't fail the request if email fails, but log it
      }
      
      console.log("New contact submission:", contact);
      
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
