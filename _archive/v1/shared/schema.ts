import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const legalAnalyses = pgTable("legal_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull(),
  category: text("category").notNull(),
  situation: text("situation").notNull(),
  analysis: jsonb("analysis"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const laws = pgTable("laws", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  country: text("country").notNull(),
  status: text("status").notNull(), // "current" | "proposed"
  category: text("category").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  sourceUrl: text("source_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLegalAnalysisSchema = createInsertSchema(legalAnalyses).pick({
  country: true,
  category: true,
  situation: true,
});

export const insertLawSchema = createInsertSchema(laws).pick({
  title: true,
  description: true,
  country: true,
  status: true,
  category: true,
  sourceUrl: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLegalAnalysis = z.infer<typeof insertLegalAnalysisSchema>;
export type LegalAnalysis = typeof legalAnalyses.$inferSelect;

export type InsertLaw = z.infer<typeof insertLawSchema>;
export type Law = typeof laws.$inferSelect;

export interface LegalAnalysisResult {
  favorableImpacts: string[];
  potentialConcerns: string[];
  detailedAnalysis: string;
  recommendedActions: string[];
}
