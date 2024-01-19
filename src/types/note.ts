import { z } from 'zod';
import { SerializedEditorState } from 'lexical';

export const noteSchema = z.object({
  _id: z.string().cuid2(),
  notebook: z.string().cuid2(),
  content: z.custom<SerializedEditorState & JSON>().nullable(),
  edittedAt: z.string(),
})

export type NoteType = z.infer<typeof noteSchema>;

export const noteDataSchema = z.record(z.string().cuid2(), noteSchema)

export type NoteDataType = z.infer<typeof noteDataSchema>;