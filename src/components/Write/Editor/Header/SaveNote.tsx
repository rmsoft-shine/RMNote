/* 사용 중단 */

import { getNote } from "@/api/db";
import editNote from "@/api/editNote";
import useApi from "@/hooks/useApi";
import { useCurrentNote, useNoteData } from "@/store/store";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function SaveNote() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setNoteData = useNoteData((state) => state.setNoteData);
  const { isPending, run } = useApi(editNote);

  const onClick = async () => {
    if (!currentNote) return;

    const res = await run(currentNote._id, editor.getEditorState().toJSON());

    if (res.ok && res.payload) {
      setCurrentNote(res.payload);
      setNoteData(getNote());
      console.log('저장 됐습니다.');
    } else {
      if (res.error) {
        alert(
          res.error.message || '저장에 실패했습니다.'
        )
      }
    }
  }
  return (
    <button
      disabled={isPending}
      className="text-sm bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded disabled:bg-gray-200"
      onClick={onClick}
    >
      Save Note
    </button>
  )
}
