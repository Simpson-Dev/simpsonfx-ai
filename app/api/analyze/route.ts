import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  // Using Gemini 2.0 Flash for the fastest chart recognition
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const { image } = await req.json();

    const prompt = `
      Act as SIMPSON FX AI, an elite SMC (Smart Money Concepts) and ICT trader.
      Analyze this XAUUSD (Gold) chart:
      1. Identify the Market Structure (is it a Break of Structure or Change of Character?).
      2. Spot the nearest Orderblocks, Fair Value Gaps, and Liquidity Pools.
      3. Confirm if a breakout or retest is successful.
      4. Give a definitive Signal: BUY, SELL, or WAIT.
      5. Provide exact price levels: ENTRY, TP1, TP2, and SL.
      Be concise and professional.
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image, mimeType: "image/png" } },
    ]);

    return NextResponse.json({ analysis: result.response.text() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI Engine Offline" }, { status: 500 });
  }
}
