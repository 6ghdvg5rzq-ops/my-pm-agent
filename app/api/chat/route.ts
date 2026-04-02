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
      - Current Role: Senior PM at TechFlow, leading the Growth squad.
      - Key Success: Led a checkout redesign that increased conversion by 22% ($2M ARR impact).
      - Skills: User Research, Data Analysis (SQL/Mixpanel), Product Discovery, and Mentorship.
      
      INSTRUCTIONS:
      - Speak in a professional, helpful tone.
      - If asked about projects, explain the Problem, the Action you took, and the Result.
      - If you don't know an answer, tell them to email you at [YOUR EMAIL].
    `,
    messages,
  });

  return result.toDataStreamResponse();
}