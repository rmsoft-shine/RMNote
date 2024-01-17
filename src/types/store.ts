import { z } from 'zod';
import { noteSchema } from './note';
import { notebookDataSchema, notebookSchema } from './notebook';

const useSideMenuSchema = z.object({
  isSideMenu: z.boolean(),
  toggleSideMenu: z.function().returns(z.void()),
})

export type UseSideMenuType = z.infer<typeof useSideMenuSchema>;

const useNotebookDataSchema = z.object({
  notebookData: notebookDataSchema,
  setNotebookData: z.function().args(z.object({})).returns(z.void()),
})

export type UseNotebookDataType = z.infer<typeof useNotebookDataSchema>

const useCurrentNotebookSchema = z.object({
  currentNotebook: notebookSchema.nullable(),
  setCurrentNotebook: z.function().args(notebookSchema.nullable()).returns(z.void()),
})

export type UseCurrentNotebookType = z.infer<typeof useCurrentNotebookSchema>;

const useCurrentNoteSchema = z.object({
  currentNote: noteSchema.nullable(),
  setCurrentNote: z.function().args(noteSchema.nullable()).returns(z.void()),
})

export type UseCurrentNoteType = z.infer<typeof useCurrentNoteSchema>;