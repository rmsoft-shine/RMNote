import { useEffect, useLayoutEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { BLUR_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_NORMAL, SerializedEditorState } from "lexical";
import { useCurrentNote, useNoteData } from "@/store/store";
import { mergeRegister } from "@lexical/utils";
import { getNote } from "@/api/db";
import editNote from "@/api/editNote";

export default function CustomPlugin() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const setNoteData = useNoteData((state) => state.setNoteData);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const isFirstRender = useRef(true);
  const isChanged = useRef(false);

  // 노트 저장
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
      console.log('editted!');
    } else {
      if (res.error) {
        alert(
          res.error.message || "갱신된 정보를 수신하지 못했습니다."
        )
      }
    }
  }

  /* useEffect */
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      // 에디터가 처음 불러와졌을 때에만 내용을 parse해서 추가
      isFirstRender.current = false;
      if (currentNote?.content) {
        const parsed = editor.parseEditorState(currentNote?.content);
        editor.setEditorState(parsed);
      }
    }
  }, [editor, currentNote])

  useEffect(() => {
    if (currentNote?.content === null) {
      // 새로운 노트 생성 시 포커스
      editor.focus()
    }
  }, [editor, currentNote])

  useEffect(() => {
    // blur 이벤트 시 저장
    return editor.registerCommand(
      BLUR_COMMAND,
      () => {
        if (timer.current) clearTimeout(timer.current);
        if (isChanged.current) {
          // 내용에 변화가 있을 때에만
          edit(editor.getEditorState().toJSON());
        }
          return false;
      },
      COMMAND_PRIORITY_NORMAL
    )
  }, [editor, currentNote])

  useEffect(() => {
    // onChange 이벤트 시 저장
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (timer.current) clearTimeout(timer.current);
        if (!isFirstRender.current) {
          timer.current = setTimeout(() => {
            edit(editorState.toJSON());
          }, 2000)
        }
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          isChanged.current = payload;
          return false;
        },
        COMMAND_PRIORITY_NORMAL
      )
    )
  }, [editor, currentNote])
  
  return null;
}
