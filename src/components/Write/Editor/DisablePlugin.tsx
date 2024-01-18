import { useCurrentNote } from "@/store/store";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function DisablePlugin() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);

  useEffect(() => {
    if (currentNote === null) {
      editor.setEditable(false);
    }
    else {
      editor.setEditable(true);
    }
  }, [currentNote])

  return null;
}
