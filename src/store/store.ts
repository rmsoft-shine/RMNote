import { CurrentNoteType, CurrentNotebookType, IsSideMenuType } from "@/types/store";
import { create } from "zustand";

export const useSideMenuStore = create<IsSideMenuType>((set) => ({
  isSideMenu: true,
  toggleSideMenu: () => set((state: { isSideMenu: boolean }) => ({
    isSideMenu: !state.isSideMenu
  }))
}))

export const useNotebookList = create((set) => ({
  notebookList: {},
  setNotebookList: (list: { [key: string]: {} }) => set({ notebookLst: list })
}))

export const useCurrentNotebook = create<CurrentNotebookType>((set) => ({
  currentNotebook: null,
  setCurrentNotebook: (id: string) => set({ currentNotebook: id })
}));

export const useCurrentNote = create<CurrentNoteType>((set) => ({
  currentNote: null,
  setCurrentNote: (id: string) => set({ currentNote: id })
}));

// export const useAppStore = create((set) => ({
//   isSideMenu: true,
//   notebookList: {},
//   currentNotebook: null,
//   currentNote: null,
//   setIsSideMenu: () => set((state) => ({ isSideMenu: !state.isSideMenu})),
//   setNotebookList: (list: {
//     [key: string]: {}
//   }) => set(() => ({ notebookList: list, })),
//   setCurrentNotebook: (id: string) => set(() => ({
//     currentNotebook: id,
//   })),
//   setCurrentNote: (id: string) => set(() => ({
//     currentNote: id,
//   }))
// }));