import { MouseEvent } from "react";
import { getNote } from "@/api/db";
import { useCurrentNote, useCurrentNotebook, useNoteData, useNotebookData } from "@/store/store";
import deleteNotebook from "@/api/deleteNotebook";
import useApi from "@/hooks/useApi";
import ButtonIcon from "@/components/Common/Buttonicon";
import { NotebookType } from "@/types/notebook";

export default function ListItem({
  notebook
}: {
  notebook: NotebookType
}) {
  const currentNote = useCurrentNote((state) => state.currentNote);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const noteData = useNoteData((state) => state.noteData);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setCurrentNotebook = useCurrentNotebook((state) => state.setCurrentNotebook);
  const setNotebookData = useNotebookData((state) => state.setNotebookData);
  const { isPending, run } = useApi(deleteNotebook);

  if (!notebook) return;

  const isSelected = currentNotebook?._id === notebook._id;
  const notes = Object.values(noteData).filter((note) => note.notebook === notebook._id);

  const selectThis = async () => {
    if (currentNote && currentNote.notebook !== notebook._id) {
      setCurrentNote(null);
    }
    setCurrentNotebook(notebook);
  }

  const deleteThis = async (event: MouseEvent) => {
    event.stopPropagation();

    const isAllowed = window.confirm('정말로 삭제하시겠습니까?');

    if (isAllowed) {
      const res = await run(notebook._id);

      if (res.ok && res.payload) {
        if (currentNotebook?._id === notebook._id) {
          // 삭제한 노트북이 현재 선택한 노트북인 경우,
          // 노트 목록도 사라지게 하기 위해서
          setCurrentNotebook(null);
        }
        setNotebookData(res.payload);
      } else {
        if (res.error) {
          alert(res.error.message || 'NOTEBOOK을 삭제하지 못했습니다.')
        }
      }
    } else return;
  }

  return (
    <li
      className={
        "group w-full py-2 px-6 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer h-12"
        + (isSelected ? " bg-zinc-100" : "")
      }
      onClick={selectThis}
    >
      <div className="inline-block w-6 h-8 bg-red-300 min-w-[1.5rem] rounded"></div>
      <h3 className="shrink whitespace-nowrap">{notebook.name}</h3>
      <small className="text-xs text-gray-400">{notes.length}</small>
      <ButtonIcon
        disabled={isPending}
        icon="delete"
        className="ml-auto invisible text-gray-400 group-hover:visible hover:text-black"
        onClick={deleteThis}
      />
    </li>
  )
}
