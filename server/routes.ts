import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  app.get("/api/companies", async (req, res) => {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    const companies = await storage.getCompanies(page * limit, limit, status);
    res.json(companies);
  });

  app.get("/api/companies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const company = await storage.getCompanyById(id);
    
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    
    res.json(company);
  });

  const httpServer = createServer(app);
  return httpServer;
}
