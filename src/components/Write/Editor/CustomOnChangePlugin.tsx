import { useEffect, useLayoutEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCurrentNote, useNoteData } from "@/store/store";
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR, COMMAND_PRIORITY_LOW, SerializedEditorState } from "lexical";
import editNote from "@/api/editNote";
import { getNote } from "@/api/db";

export default function CustomOnChangePlugin() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setNoteData = useNoteData((state) => state.setNoteData);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (currentNote?.content === null) {
      editor.focus()
    }
  }, [currentNote])

  useLayoutEffect(() => {
    if (currentNote?.content) {
      const parsed = editor.parseEditorState(currentNote?.content);
      editor.setEditorState(parsed);
    } else {
      const empty = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
      const parsed = editor.parseEditorState(empty);
      editor.setEditorState(parsed);
    }
  }, [editor, currentNote])

  const edit = async (content: SerializedEditorState) => {
    if (!currentNote) return;
    if (content === currentNote.content) return;

    const res = await editNote(
      currentNote._id,
      content
    )

    if (res.ok && res.payload) {
      setCurrentNote(res.payload)
      setNoteData(getNote());
    } else {
      if (res.error) {
        alert(
          res.error.message || "갱신된 정보를 수신하지 못했습니다."
        )
      }
    }
  }

  useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        // if (timer.current) clearTimeout(timer.current);
        // edit(editor.getEditorState().toJSON());
        // console.log('blured');
        return false;
      },
      COMMAND_PRIORITY_LOW
    )
  }, [currentNote])

  editor.registerUpdateListener(({ editorState }) => {
    if (timer.current) clearTimeout(timer.current);
    // console.log(editorState);
    // timer.current = setTimeout(() => {
    //   edit(editorState.toJSON());
    //   console.log('editted!');
    // }, 2000)
  })
  
  return null;
}
