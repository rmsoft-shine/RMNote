import deleteNote from "@/api/deleteNote";
import useApi from "@/hooks/useApi";
import { useCurrentNote, useNoteData } from "@/store/store";

export default function DeleteThis({ id }: { id: string }) {
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setNoteData = useNoteData((state) => state.setNoteData);
  const { run } = useApi(deleteNote);

  const onClick = async () => {
    const isAllowed = window.confirm("정말로 삭제하시겠습니까?");

    if (isAllowed) {
      const res = await run(id);

      if (res.ok && res.payload) {
        setNoteData(res.payload);
        if (currentNote?._id === id) {
          setCurrentNote(null);
        }
        console.log("삭제 완료");
      } else {
        if (res.error) {
          alert(
            res.error.message || "삭제하지 못했습니다."
          )
        }
      }
    } else return;
  }

  return (
      <li
        className="hover:bg-gray-200 py-1 px-6 cursor-pointer"
        onClick={onClick}
      >
        이 노트 삭제하기
      </li>
  )
}
