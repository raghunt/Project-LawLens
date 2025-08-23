import { GoogleGenAI } from "@google/genai";
import { type LegalAnalysisResult } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || "" 
});

export async function analyzeLegalImpact(
  country: string,
  category: string,
  situation: string
): Promise<LegalAnalysisResult> {
  try {
    const systemPrompt = `You are a legal research assistant specializing in US and Indian law. 
Analyze the user's situation and provide insights on how current and proposed laws might affect them.

IMPORTANT GUIDELINES:
- Provide specific, actionable insights
- Reference actual laws and regulations where applicable
- Clearly separate favorable impacts from potential concerns
- Include practical next steps
- Focus on factual analysis, not legal advice
- Consider both current and proposed legislation

Respond with JSON in this exact format:
{
  "favorableImpacts": ["impact1", "impact2", ...],
  "potentialConcerns": ["concern1", "concern2", ...],
  "detailedAnalysis": "comprehensive analysis text",
  "recommendedActions": ["action1", "action2", ...]
}`;

    const userPrompt = `Please analyze this legal situation:

Country/Region: ${country}
Legal Category: ${category}
Situation: ${situation}

Provide a comprehensive analysis considering relevant laws and regulations that may impact this situation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            favorableImpacts: {
              type: "array",
              items: { type: "string" }
            },
            potentialConcerns: {
              type: "array",
              items: { type: "string" }
            },
            detailedAnalysis: { type: "string" },
            recommendedActions: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["favorableImpacts", "potentialConcerns", "detailedAnalysis", "recommendedActions"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini AI");
    }

    const result: LegalAnalysisResult = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Failed to analyze legal impact:", error);
    throw new Error(`Legal analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
