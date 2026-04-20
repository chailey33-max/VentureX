import { GoogleGenAI, Type } from "@google/genai";
import { BusinessIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateNewIdeas(existingTitles: string[]): Promise<BusinessIdea[]> {
  const prompt = `You are an expert business consultant specializing in "simple" but highly profitable local service businesses.
  
  TASK: Generate 5 unique business ideas that are different from these existing ones: ${existingTitles.join(', ')}.
  
  GUARDRAILS:
  - Each business MUST have a startup cost under $5000.
  - Focus on simple, high-demand service or maintenance businesses (e.g., cleaning, repair, specialty labor).
  - Do NOT suggest digital-only businesses (SaaS, apps, etc.). These must be physical, local services.
  - Provide realistic startup cost ranges based on current market rates for equipment and licensing.
  - Include 4 specific, actionable customer acquisition strategies for each.
  - Ensure the "potentialIncome" is a realistic annual range for a solo operator or small team.
  
  OUTPUT FORMAT: Return a JSON array of objects following the specified schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "A unique UUID or short string ID" },
            title: { type: Type.STRING, description: "Catchy but professional business name" },
            category: { type: Type.STRING, description: "One of: Service, Maintenance, Automotive, Landscaping, Specialty, Seasonal, Cleaning" },
            description: { type: Type.STRING, description: "A 2-3 sentence compelling description of the opportunity" },
            startupCost: {
              type: Type.OBJECT,
              properties: {
                min: { type: Type.NUMBER },
                max: { type: Type.NUMBER }
              },
              required: ["min", "max"]
            },
            potentialIncome: { type: Type.STRING, description: "e.g., '$40,000 - $85,000/year'" },
            customerAcquisition: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 specific strategies"
            }
          },
          required: ["id", "title", "category", "description", "startupCost", "potentialIncome", "customerAcquisition"]
        }
      }
    }
  });

  try {
    const text = response.text;
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return [];
  }
}
