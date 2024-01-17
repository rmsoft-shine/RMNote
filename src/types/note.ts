import { z } from 'zod';
import { EditorState } from 'lexical';

export const noteSchema = z.object({
  _id: z.string().cuid2(),
  notebook: z.string().cuid2(),
  content: z.custom<EditorState>(),
  edittedAt: z.date(),
  type: z.literal('NOTE')
})

export type NoteType = z.infer<typeof noteSchema>;

export const noteDataSchema = z.record(z.string().cuid2(), noteSchema)

export type NoteDataType = z.infer<typeof noteDataSchema>;