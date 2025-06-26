import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, type InsertProject } from "@shared/schema";
import { z } from "zod";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "octocat";
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
      
      // Filter out private repos and forks, transform to our schema
      const projects: InsertProject[] = repos
        .filter(repo => !repo.private && !repo.fork)
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
      
      // In a real application, you might want to send an email here
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
