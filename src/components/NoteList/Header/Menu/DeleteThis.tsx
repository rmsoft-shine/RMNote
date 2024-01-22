import { MouseEvent } from "react";
import { useCurrentNotebook, useNotebookData } from "@/store/store"
import useApi from "@/hooks/useApi";
import deleteNotebook from "@/api/deleteNotebook";

export default function DeleteThis({ offModal }: { offModal: () => void }) {
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const setCurrentNotebook = useCurrentNotebook((state) => state.setCurrentNotebook);
  const setNotebookData = useNotebookData((state) => state.setNotebookData);
  const { isPending, run } = useApi(deleteNotebook);

  const deleteThis = async (event: MouseEvent) => {
    event.stopPropagation();

    const isAllowed = window.confirm('정말로 삭제하시겠습니까?');

    if (isAllowed) {
      const res = await run(currentNotebook?._id);

      if (res.ok && res.payload) {
        if (currentNotebook?._id === currentNotebook?._id) {
          setCurrentNotebook(null);
        }
        setNotebookData(res.payload);
        offModal();
      } else {
        if (res.error) {
          alert(res.error.message || 'NOTEBOOK을 삭제하지 못했습니다.')
        }
      }
    } else return;
  }
  return (
    <li className="hover:bg-gray-200 py-1 px-6 cursor-pointer">
      <button disabled={isPending} onClick={deleteThis}>
        이 노트북 삭제하기
      </button>
    </li>
  )
}
