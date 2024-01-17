import { getNote } from "@/api/db";
import deleteNotebook from "@/api/deleteNotebook";
import ButtonIcon from "@/components/Common/Buttonicon";
import useApi from "@/hooks/useApi";
import { useCurrentNotebook, useNotebookData } from "@/store/store";
import { NotebookType } from "@/types/notebook";
import { MouseEvent } from "react";

export default function ListItem({
  notebook
}: {
  notebook: NotebookType
}) {
  const currentNotebook = useCurrentNotebook(state => state.currentNotebook);
  const setNotebookData = useNotebookData(state => state.setNotebookData);
  const setCurrentNotebook = useCurrentNotebook(state => state.setCurrentNotebook);
  const { isPending, run } = useApi(deleteNotebook);

  if (!notebook) return;

  const isSelected = currentNotebook === notebook._id;
  const notes = Object.entries(getNote());

  const selectThis = async () => {
    setCurrentNotebook(notebook._id);
  }

  const deleteThis = async (event: MouseEvent) => {
    event.stopPropagation();

    const isAllowed = window.confirm('정말로 삭제하시겠습니까?');

    if (isAllowed) {
      const res = await run(notebook._id);

      if (res.ok && res.payload) {
        if (currentNotebook === notebook._id) {
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
      <small className="text-xs text-gray-400">{0}</small>
      <ButtonIcon
        disabled={isPending}
        icon="delete"
        className="ml-auto invisible text-gray-400 group-hover:visible hover:text-black"
        onClick={deleteThis}
      />
    </li>
  )
}
