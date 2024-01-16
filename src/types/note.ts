import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

const noteSchema = z.object({
  id: z.string().cuid2(),
  content: z.string(),
  edittedAt: z.date(),
  type: z.literal('NOTE')
})

export type NoteType = z.infer<typeof noteSchema>;

// const BaseNotebookSchema = z.object({
//   id: z.string().cuid2(),
//   type: z.literal('NOTEBOOK')
// });

// const ExtendedNotebookSchema = z.record(z.string().cuid2(), BaseNotebookSchema).optional().and(z.record(NoteSchema).optional());

// export type NotebookType = z.infer<typeof BaseNotebookSchema>

// let a: NB;

// a = {
//   id: createId(),
//   type: 'NOTEBOOK',
// }

// type NB = {
//   id: string;
//   type: 'NOTEBOOK',
// } & {
//   [key: string]: NoteType | NB | undefined;
// }

// type NNB = Partial<NB>