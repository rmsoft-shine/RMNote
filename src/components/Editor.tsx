'use client'

import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useRef} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {EditorRefPlugin} from '@lexical/react/LexicalEditorRefPlugin';

const theme = {
  // Theme styling goes here
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };
  
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current);
  })

  return (
    
    <section className="grow flex flex-col">
    <LexicalComposer initialConfig={initialConfig}>
      <EditorRefPlugin editorRef={ref}/>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="w-full h-main p-6 resize-none" />}
        placeholder={<div className="absolute w-max m-6">내용을 입력해주세요.</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
    <button onClick={() => console.log(ref.current)}>Test</button>
    </section>
  );
}