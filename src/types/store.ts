import { z } from 'zod';
import { noteDataSchema, noteSchema } from './note';
import { notebookDataSchema, notebookSchema } from './notebook';

const useSideMenuSchema = z.object({
  isSideMenu: z.boolean(),
  toggleSideMenu: z.function().returns(z.void()),
})

export type UseSideMenuType = z.infer<typeof useSideMenuSchema>;

const useNotebookDataSchema = z.object({
  notebookData: notebookDataSchema,
  setNotebookData: z.function().args(notebookDataSchema).returns(z.void()),
})

export type UseNotebookDataType = z.infer<typeof useNotebookDataSchema>;

const useNoteDataSchema = z.object({
  noteData: noteDataSchema,
  setNoteData: z.function().args(noteDataSchema).returns(z.void()),
})

export type UseNoteDataType = z.infer<typeof useNoteDataSchema>;

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