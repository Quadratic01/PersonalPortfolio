import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, type InsertProject, type Project } from "@shared/schema";
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

// Create fallback projects when GitHub API fails
async function createFallbackProjects(): Promise<Project[]> {
  const projectImages: Record<string, string> = {
    'PersonalPortfolio': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center',
    'Edusity': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&crop=center',
    'react_movies_app': 'https://images.unsplash.com/photo-1489599735734-79b4169cea81?w=800&h=400&fit=crop&crop=center',
    'Color-Flipper': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop&crop=center',
  };

  const fallbackData: InsertProject[] = [
    {
      name: 'PersonalPortfolio',
      description: 'A modern, responsive portfolio website built with React and TypeScript',
      html_url: 'https://github.com/quadriabdulsalam/PersonalPortfolio',
      homepage: null,
      language: 'TypeScript',
      stargazers_count: 5,
      topics: ['react', 'typescript', 'portfolio', 'tailwindcss'],
      image_url: projectImages['PersonalPortfolio'],
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-12-01'),
    },
    {
      name: 'Edusity',
      description: 'Educational platform with modern UI and responsive design',
      html_url: 'https://github.com/quadriabdulsalam/Edusity',
      homepage: null,
      language: 'JavaScript',
      stargazers_count: 3,
      topics: ['react', 'education', 'frontend', 'responsive'],
      image_url: projectImages['Edusity'],
      created_at: new Date('2024-02-10'),
      updated_at: new Date('2024-11-15'),
    },
    {
      name: 'react_movies_app',
      description: 'Movie database app with search and detailed movie information',
      html_url: 'https://github.com/quadriabdulsalam/react_movies_app',
      homepage: null,
      language: 'JavaScript',
      stargazers_count: 7,
      topics: ['react', 'movies', 'api', 'entertainment'],
      image_url: projectImages['react_movies_app'],
      created_at: new Date('2024-03-05'),
      updated_at: new Date('2024-10-20'),
    },
    {
      name: 'Color-Flipper',
      description: 'Interactive color generator with random and hex color options',
      html_url: 'https://github.com/quadriabdulsalam/Color-Flipper',
      homepage: null,
      language: 'JavaScript',
      stargazers_count: 2,
      topics: ['javascript', 'color', 'generator', 'frontend'],
      image_url: projectImages['Color-Flipper'],
      created_at: new Date('2024-01-20'),
      updated_at: new Date('2024-09-10'),
    },
  ];

  return await storage.updateProjects(fallbackData);
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
        headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
      }
      
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        { headers }
      );
      
      if (!response.ok) {
        console.error("GitHub API error:", response.status, response.statusText);
        // Return fallback projects if API fails and no cached data
        if (cachedProjects.length === 0) {
          const fallbackProjects = await createFallbackProjects();
          return res.json(fallbackProjects);
        }
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

      // Define project images mapping
      const projectImages: Record<string, string> = {
        'PersonalPortfolio': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center',
        'Edusity': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&crop=center',
        'react_movies_app': 'https://images.unsplash.com/photo-1489599735734-79b4169cea81?w=800&h=400&fit=crop&crop=center',
        'Color-Flipper': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop&crop=center',
      };

      // Transform to our schema
      const projects: InsertProject[] = personalProjects
        .map(repo => ({
          name: repo.name,
          description: repo.description || null,
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          language: repo.language || null,
          stargazers_count: repo.stargazers_count || 0,
          topics: repo.topics || [],
          image_url: projectImages[repo.name] || null,
          created_at: new Date(repo.created_at),
          updated_at: new Date(repo.updated_at),
        }));
      
      // Update storage with fresh data
      const updatedProjects = await storage.updateProjects(projects);
      res.json(updatedProjects);
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Return cached projects on error, or fallback if no cache
      const cachedProjects = await storage.getAllProjects();
      if (cachedProjects.length === 0) {
        const fallbackProjects = await createFallbackProjects();
        return res.json(fallbackProjects);
      }
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
          subject: contactData.subject || "Portfolio Contact"
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
