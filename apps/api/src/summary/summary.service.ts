import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Define the SOAP schema using Zod for type safety and validation
const soapSummarySchema = z.object({
  subjective: z
    .string()
    .describe('Patient reported symptoms, history, and complaints'),
  objective: z
    .string()
    .describe(
      'Observable and measurable findings including vital signs and examination results',
    ),
  assessment: z
    .string()
    .describe(
      'Clinical impression, diagnosis, and evaluation of the patient condition',
    ),
  plan: z
    .string()
    .describe(
      'Treatment recommendations, medications prescribed, and follow-up instructions',
    ),
});

@Injectable()
export class SummaryService {
  private model;

  constructor(private configService: ConfigService) {
    this.model = openai('gpt-4-turbo');
  }

  async generateSOAPSummary(content: string): Promise<{
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  }> {
    try {
      // Use generateObject for structured output with automatic parsing
      const { object } = await generateObject({
        model: this.model,
        schema: soapSummarySchema,
        system: `You are a medical professional creating SOAP notes summaries.
Convert the provided medical notes into a structured SOAP format.
Be concise but comprehensive. Include all relevant medical information.

Guidelines:
- Subjective: Include chief complaint, history of present illness, past medical history, medications, allergies, and review of systems
- Objective: Include vital signs, physical examination findings, laboratory results, and imaging results
- Assessment: Provide clinical diagnosis, differential diagnoses if applicable, and overall clinical impression
- Plan: Include treatment plan, medications prescribed with dosages, follow-up instructions, and patient education provided`,
        prompt: `Please summarize the following medical notes in SOAP format:\n\n${content}`,
        temperature: 0.3,
        maxTokens: 1000,
      });

      if (
        !object ||
        typeof object.subjective !== 'string' ||
        typeof object.objective !== 'string' ||
        typeof object.assessment !== 'string' ||
        typeof object.plan !== 'string'
      ) {
        throw new Error('Summary format invalid');
      }

      return {
        subjective: object.subjective,
        objective: object.objective,
        assessment: object.assessment,
        plan: object.plan,
      };
    } catch (error) {
      console.error('Summary generation error:', error);
      throw new Error('Failed to generate summary');
    }
  }
}
