import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL_NAME = "gemini-3-flash-preview";

export async function sumarizedMarkdown(markdown: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
      You are a data summarization engine for an AI chatbot.
      Convert the input website markdown, text, or CSV data into a CLEAN, DENSE SUMMARY for LLM context usage.

      STRICT RULES:
      - Output ONLY plain text.
      - Write as ONE continuous paragraph.
      - Remove navigation, menus, buttons, CTAs, pricing tables, sponsors, ads, testimonials, community chats, UI labels, emojis, and decorative content.
      - Remove repetition and marketing language.
      - Keep ONLY factual, informational content useful for customer support.
      - Compress aggressively while preserving meaning.
      - The final output MUST be under 2000 words.

      INPUT:
      ${markdown}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 900,
      },
    });

    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error in summarizeMarkdown:", error);
    throw error;
  }
}

export async function summarizeConversation(messages: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const conversationText = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
      Summarize the following conversation history into a concise paragraph, 
      preserving key details and user intent. 
      The final output MUST be under 2000 words.

      ${conversationText}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 500,
      },
    });

    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error in summarizeConversation:", error);
    throw error;
  }
}