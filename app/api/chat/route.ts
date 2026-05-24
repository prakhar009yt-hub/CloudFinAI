import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history, contextData } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable not set" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are CloudFinAI, an expert cloud architecture and cost optimization assistant.
You help users understand their cloud spending, suggest cost-saving measures, and analyze their cloud infrastructure.
Here is the current user's dashboard context data:
${JSON.stringify(contextData, null, 2)}
Respond concisely and professionally in markdown format.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: history || [],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
        { error: "Failed to generate AI response. Please check your API key or try again later." },
        { status: 500 }
    );
  }
}
