'use server';

/**
 * @fileOverview AI agent for blending two art styles for avatar creation using a style slider.
 *
 * - styleMixerTool - A function that handles the style mixing process.
 * - StyleMixerToolInput - The input type for the styleMixerTool function.
 * - StyleMixerToolOutput - The return type for the styleMixerTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleMixerToolInputSchema = z.object({
  styleA: z.string().describe('The first art style to blend.'),
  styleB: z.string().describe('The second art style to blend.'),
  weight: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'The weight of style A in the blend, as a percentage (0-100). The weight of style B will be 100 - weight.'
    ),
  referenceImage: z
    .string()
    .optional()
    .describe(
      "An optional reference image to guide the avatar's style, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  accessory: z.string().optional().describe('An optional accessory to add to the avatar.'),
  brandHexes: z
    .string()
    .optional()
    .describe(
      'An optional comma separated list of brand colors in hex format to use as a color palette for the avatar.'
    ),
});

export type StyleMixerToolInput = z.infer<typeof StyleMixerToolInputSchema>;

const StyleMixerToolOutputSchema = z.object({
  avatarDataUri: z
    .string()
    .describe(
      'The generated avatar as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // The LLM is instructed to provide data URI format
    ),
});

export type StyleMixerToolOutput = z.infer<typeof StyleMixerToolOutputSchema>;

export async function styleMixerTool(input: StyleMixerToolInput): Promise<StyleMixerToolOutput> {
  return styleMixerToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleMixerToolPrompt',
  input: {schema: StyleMixerToolInputSchema},
  output: {schema: StyleMixerToolOutputSchema},
  prompt: `Blend style A: {{{styleA}}} and style B: {{{styleB}}} with weight {{{weight}}}% toward style A.

    Produce a single avatar headshot.

    If brand colors are provided, use them. Brand colors: {{{brandHexes}}}

    Include accessory: {{{accessory}}}.

    Output a data URI for a PNG image suitable for use as an avatar.

    {{#if referenceImage}}
      Use the reference image to guide the avatar's style.  If provided, preserve facial identity from reference.
      Reference image: {{media url=referenceImage}}
    {{/if}}`,
});

const styleMixerToolFlow = ai.defineFlow(
  {
    name: 'styleMixerToolFlow',
    inputSchema: StyleMixerToolInputSchema,
    outputSchema: StyleMixerToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
