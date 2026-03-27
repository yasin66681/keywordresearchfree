import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface KeywordData {
  keyword: string;
  volume: number;
  cpc: number;
  cpm: number;
  difficulty: number;
  trafficValue: number;
  trend: { month: string; value: number }[];
}

export async function getKeywordResearch(keyword: string, platform: string, country: string): Promise<KeywordData[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Keyword research: "${keyword}" on "${platform}" in "${country}". 
      Return 10 related keywords with volume, CPC, CPM, difficulty (0-100), traffic value, and 12-month trend.`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              volume: { type: Type.NUMBER },
              cpc: { type: Type.NUMBER },
              cpm: { type: Type.NUMBER },
              difficulty: { type: Type.NUMBER },
              trafficValue: { type: Type.NUMBER },
              trend: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    month: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  }
                }
              }
            },
            required: ["keyword", "volume", "cpc", "cpm", "difficulty", "trafficValue", "trend"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Keyword research failed:", error);
    if (error.message?.includes("404") || error.message?.includes("NOT_FOUND")) {
      throw new Error("The research model requested was not found. Please check the configuration.");
    }
    throw error;
  }
}
