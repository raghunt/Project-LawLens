import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLegalAnalysisSchema } from "@shared/schema";
import { analyzeLegalImpact } from "./services/gemini";
import { initializeLawsData } from "./data/laws";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize laws data
  await initializeLawsData();

  // Legal Analysis Routes
  app.post("/api/legal-analysis", async (req, res) => {
    try {
      const validatedData = insertLegalAnalysisSchema.parse(req.body);
      
      // Create initial analysis record
      const analysis = await storage.createLegalAnalysis(validatedData);
      
      // Perform AI analysis
      const result = await analyzeLegalImpact(
        validatedData.country,
        validatedData.category,
        validatedData.situation
      );
      
      // Update with results
      const updatedAnalysis = await storage.updateLegalAnalysisResult(analysis.id, result);
      
      res.json(updatedAnalysis);
    } catch (error) {
      console.error("Legal analysis error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Analysis failed" 
      });
    }
  });

  app.get("/api/legal-analysis/:id", async (req, res) => {
    try {
      const analysis = await storage.getLegalAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to retrieve analysis" 
      });
    }
  });

  // Laws Database Routes
  app.get("/api/laws", async (req, res) => {
    try {
      const { country, status, category } = req.query;
      const laws = await storage.getLaws(
        country as string,
        status as string,
        category as string
      );
      res.json(laws);
    } catch (error) {
      console.error("Get laws error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to retrieve laws" 
      });
    }
  });

  app.get("/api/laws/:id", async (req, res) => {
    try {
      const law = await storage.getLaw(req.params.id);
      if (!law) {
        return res.status(404).json({ error: "Law not found" });
      }
      res.json(law);
    } catch (error) {
      console.error("Get law error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to retrieve law" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
