'use client'

import addNote from "@/api/addNote";
import { getNote } from "@/api/db";
import useApi from "@/hooks/useApi";
import { useCurrentNote, useCurrentNotebook, useNoteData } from "@/store/store"

export default function NewNote() {
  const currentNote = useCurrentNote((state) => state.currentNote);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setNoteData = useNoteData((state) => state.setNoteData);
  const { isPending, run } = useApi(addNote);

  const writeNew = async () => {
    if (!(currentNotebook && currentNotebook._id)) {
      // 노트북 지정 처리 전까지 임시적으로 노트북 없이 작성 제한
      alert("먼저 메모를 저장할 Notebook을 선택해주세요.");
      return;
    } else if (currentNote && currentNote.content === null) {
      // console.log(document.querySelector('[data-lexical-editor=true]'));
      const editor = document.querySelector('[contenteditable=true]') as HTMLDivElement;
      if (editor) editor.focus();
      return;
    } else {
      const notebook = currentNotebook._id;

      const res = await run(notebook);
      if (res.ok && res.payload) {
        setCurrentNote(res.payload);
        setNoteData(getNote());
      } else {
        if (res.error) {
          alert(
            res.error.message || "새로운 Note를 생성하지 못했습니다."
          )
        }
      }
    }
  }
  
  return (
    <button
      disabled={isPending}
      className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded disabled:bg-gray-200"
      onClick={writeNew}
    >
      New Note
    </button>
  )
}
