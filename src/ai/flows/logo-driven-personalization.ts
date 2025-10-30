'use server';
/**
 * @fileOverview Analyzes a user's uploaded logo or brand colors and suggests avatar color palettes and style matches.
 *
 * - suggestAvatarStyles - A function that handles the avatar style suggestion process based on logo analysis.
 * - SuggestAvatarStylesInput - The input type for the suggestAvatarStyles function.
 * - SuggestAvatarStylesOutput - The return type for the suggestAvatarStyles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAvatarStylesInputSchema = z.object({
  logoDataUri: z
    .string()
    .describe(
      "A logo image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  brandName: z.string().describe('The name of the brand associated with the logo.'),
});
export type SuggestAvatarStylesInput = z.infer<typeof SuggestAvatarStylesInputSchema>;

const SuggestAvatarStylesOutputSchema = z.object({
  suggestedPalette: z
    .array(z.string())
    .describe('An array of suggested color palette hex codes derived from the logo.'),
  suggestedStyles: z
    .array(z.string())
    .describe('An array of suggested avatar styles that match the logo aesthetic.'),
  reasoning: z
    .string()
    .describe(
      'Explanation of how the color palettes and styles align with the provided logo or brand colors.'
    ),
});
export type SuggestAvatarStylesOutput = z.infer<typeof SuggestAvatarStylesOutputSchema>;

export async function suggestAvatarStyles(
  input: SuggestAvatarStylesInput
): Promise<SuggestAvatarStylesOutput> {
  return suggestAvatarStylesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAvatarStylesPrompt',
  input: {schema: SuggestAvatarStylesInputSchema},
  output: {schema: SuggestAvatarStylesOutputSchema},
  prompt: `You are an expert branding assistant. Given a brand logo and brand name, analyze the logo and suggest appropriate avatar styles and color palettes that align with the brand identity.

Analyze the following brand and logo:
Brand Name: {{{brandName}}}
Logo: {{media url=logoDataUri}}

Based on your analysis, suggest a color palette (array of hex codes) and a list of avatar styles that would be appropriate for avatars representing this brand.
Also explain your reasoning.

Output in the format specified by the schema.  Make sure the suggestedPalette contains hex color codes.
`,
});

const suggestAvatarStylesFlow = ai.defineFlow(
  {
    name: 'suggestAvatarStylesFlow',
    inputSchema: SuggestAvatarStylesInputSchema,
    outputSchema: SuggestAvatarStylesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

