import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { infrastructureData } = await req.json();

    const prompt = `You are an expert Cloud DevOps and FinOps AI Agent. Analyze the following summary of cloud infrastructure usage and spend over the last month. 
Provide 3-5 specific, highly actionable recommendations for optimization. For each recommendation include the expected savings, severity (High, Medium, Low), and action required. Provide the response as a JSON array of objects with the keys: id (string), title (string), description (string), severity ('High' | 'Medium' | 'Low'), expectedSavings (number in dollars), category ('Compute' | 'Storage' | 'Network' | 'Database' | 'Other'), and actionRequired (string).

Here is the infrastructure data summary:
${JSON.stringify(infrastructureData, null, 2)}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "[]";
    const recommendations = JSON.parse(text);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error analyzing with Gemini:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
