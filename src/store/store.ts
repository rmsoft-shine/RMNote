import { getNotebook } from "@/api/db";
import { NotebookDataType } from "@/types/notebook";
import { UseCurrentNoteType, UseCurrentNotebookType, UseSideMenuType, UseNotebookDataType } from "@/types/store";
import { create } from "zustand";

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
  setCurrentNotebook: (_id: string | null) => set({ currentNotebook: _id })
}));

export const useCurrentNote = create<UseCurrentNoteType>((set) => ({
  currentNote: null,
  setCurrentNote: (_id: string | null) => set({ currentNote: _id })
}));