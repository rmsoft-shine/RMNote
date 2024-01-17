import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useCurrentNote } from "@/store/store";
import { SerializedEditorState } from "lexical";
import editNote from "@/api/editNote";

export default function CustomOnChangePlugin() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const edit = async (content: SerializedEditorState) => {
    if (!currentNote) return;
    if (content === currentNote.content) return;

    const res = await editNote(
      currentNote._id,
      content
    )

    if (res.ok && res.payload) {
      setCurrentNote(res.payload)
    } else {
      if (res.error) {
        alert(
          res.error.message || "갱신된 정보를 수신하지 못했습니다."
        )
      }
    }
  }
  
//  useEffect(() => {
//    if (timer.current) clearTimeout(timer.current);
//  }, [currentNote, editor])

  const onChange = async () => {
//    if (timer.current) clearTimeout(timer.current);
//    else timer.current = setTimeout(() => edit(editor.getEditorState().toJSON()), 300)
//    console.log(currentNote?._id, ' changed');
    // if (currentNote) setCurrentNote({
    //   ...currentNote,
    //   content: editor.getEditorState().toJSON()
    // })
    // else alert('잘못된 접근입니다.')
  }
  
  return (
    <OnChangePlugin onChange={onChange} />
  )
}
