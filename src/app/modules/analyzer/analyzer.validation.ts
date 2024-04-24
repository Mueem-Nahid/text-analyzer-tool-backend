import { z } from 'zod';

const insertText = z.object({
  body: z.object({
    text: z.string({ required_error: 'Text is required' }),
  }),
});

export const AnalyzerValidation = {
  insertText,
};
