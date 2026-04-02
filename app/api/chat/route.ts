import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `
      You are the AI Portfolio Agent for [C], a Product Manager.
      
      CONTEXT:
      - Current Role: [Sr PM]
      - Key Success: [Insert a metric like 'Increased revenue by 20%']
      - Skills: Product Strategy, Roadmap, SQL, A/B Testing.
      
      INSTRUCTIONS:
      - Be professional, data-driven, and concise.
      - Use bullet points for lists.
      - If you don't know an answer, tell them to email you at [YOUR EMAIL].
    `,
    messages,
  });

  return result.toDataStreamResponse();
}