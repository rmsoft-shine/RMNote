import { z } from 'zod';

const isSideMenuSchema = z.object({
  isSideMenu: z.boolean(),
  toggleSideMenu: z.function().returns(z.void()),
})

export type IsSideMenuType = z.infer<typeof isSideMenuSchema>;

const notebookListSchema = z.object({
  notebookList: z.object({}),
  setNotebookList: z.function().args(z.object({})).returns(z.void()),
})

export type NotebookListType = z.infer<typeof notebookListSchema>

const currentNotebookSchema = z.object({
  currentNotebook: z.string().nullable(),
  setCurrentNotebook: z.function().args(z.string().cuid2()).returns(z.void()),
})

export type CurrentNotebookType = z.infer<typeof currentNotebookSchema>;

const currentNoteSchema = z.object({
  currentNote: z.string().nullable(),
  setCurrentNote: z.function().args(z.string().cuid2()).returns(z.void()),
})

export type CurrentNoteType = z.infer<typeof currentNoteSchema>;