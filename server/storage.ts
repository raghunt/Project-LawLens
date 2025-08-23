import { type User, type InsertUser, type LegalAnalysis, type InsertLegalAnalysis, type Law, type InsertLaw, type LegalAnalysisResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLegalAnalysis(analysis: InsertLegalAnalysis): Promise<LegalAnalysis>;
  getLegalAnalysis(id: string): Promise<LegalAnalysis | undefined>;
  updateLegalAnalysisResult(id: string, result: LegalAnalysisResult): Promise<LegalAnalysis | undefined>;
  
  getLaws(country?: string, status?: string, category?: string): Promise<Law[]>;
  getLaw(id: string): Promise<Law | undefined>;
  createLaw(law: InsertLaw): Promise<Law>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private legalAnalyses: Map<string, LegalAnalysis>;
  private laws: Map<string, Law>;

  constructor() {
    this.users = new Map();
    this.legalAnalyses = new Map();
    this.laws = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLegalAnalysis(insertAnalysis: InsertLegalAnalysis): Promise<LegalAnalysis> {
    const id = randomUUID();
    const analysis: LegalAnalysis = {
      ...insertAnalysis,
      id,
      analysis: null,
      createdAt: new Date(),
    };
    this.legalAnalyses.set(id, analysis);
    return analysis;
  }

  async getLegalAnalysis(id: string): Promise<LegalAnalysis | undefined> {
    return this.legalAnalyses.get(id);
  }

  async updateLegalAnalysisResult(id: string, result: LegalAnalysisResult): Promise<LegalAnalysis | undefined> {
    const analysis = this.legalAnalyses.get(id);
    if (analysis) {
      analysis.analysis = result;
      this.legalAnalyses.set(id, analysis);
    }
    return analysis;
  }

  async getLaws(country?: string, status?: string, category?: string): Promise<Law[]> {
    let laws = Array.from(this.laws.values());
    
    if (country && country !== 'Both USA and India') {
      laws = laws.filter(law => law.country === country);
    }
    if (status) {
      laws = laws.filter(law => law.status === status);
    }
    if (category) {
      laws = laws.filter(law => law.category === category);
    }
    
    return laws.sort((a, b) => (b.lastUpdated?.getTime() || 0) - (a.lastUpdated?.getTime() || 0));
  }

  async getLaw(id: string): Promise<Law | undefined> {
    return this.laws.get(id);
  }

  async createLaw(insertLaw: InsertLaw): Promise<Law> {
    const id = randomUUID();
    const law: Law = {
      ...insertLaw,
      id,
      lastUpdated: new Date(),
    };
    this.laws.set(id, law);
    return law;
  }
}

export const storage = new MemStorage();
