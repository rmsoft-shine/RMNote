import { useEffect, useRef } from "react";
import { BLUR_COMMAND, COMMAND_PRIORITY_EDITOR, EditorState, SerializedEditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useCurrentNote } from "@/store/store";

export default function OnBlurPlugin() {
  const [editor] = useLexicalComposerContext();

  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
  }, [currentNote])

  useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        console.log('blured!');
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [])

  return null;
}
