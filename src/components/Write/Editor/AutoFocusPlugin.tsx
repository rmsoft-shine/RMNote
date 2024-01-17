import { useEffect, useLayoutEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCurrentNote } from '@/store/store';

export default function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  const currentNote = useCurrentNote((state) => state.currentNote);

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

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor, currentNote]);

  return null;
}