import { z } from 'zod';
import { notebookDataSchema } from './notebook';

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
  currentNotebook: z.string().nullable(),
  setCurrentNotebook: z.function().args(z.string().cuid2().nullable()).returns(z.void()),
})

export type UseCurrentNotebookType = z.infer<typeof useCurrentNotebookSchema>;

const useCurrentNoteSchema = z.object({
  currentNote: z.string().nullable(),
  setCurrentNote: z.function().args(z.string().cuid2().nullable()).returns(z.void()),
})

export type UseCurrentNoteType = z.infer<typeof useCurrentNoteSchema>;