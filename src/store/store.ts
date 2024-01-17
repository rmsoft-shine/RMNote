import { create } from "zustand";
import { NoteType } from "@/types/note";
import { NotebookDataType, NotebookType } from "@/types/notebook";
import { UseCurrentNoteType, UseCurrentNotebookType, UseSideMenuType, UseNotebookDataType } from "@/types/store";

export const useSideMenuStore = create<UseSideMenuType>((set) => ({
  isSideMenu: true,
  toggleSideMenu: () => set((state: { isSideMenu: boolean }) => ({
    isSideMenu: !state.isSideMenu
  }))
}))

export const useNotebookData = create<UseNotebookDataType>((set) => ({
  notebookData: {},
  setNotebookData: (list: NotebookDataType) => set({ notebookData: list })
}))

export const useCurrentNotebook = create<UseCurrentNotebookType>((set) => ({
  currentNotebook: null,
  setCurrentNotebook: (notebook: NotebookType | null) => set({ currentNotebook: notebook })
}));

export const useCurrentNote = create<UseCurrentNoteType>((set) => ({
  currentNote: null,
  setCurrentNote: (note: NoteType | null) => set({ currentNote: note })
}));