'use client'

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"; 
import AutoFocusPlugin from "./Editor/AutoFocusPlugin";
import CustomOnChangePlugin from "./Editor/CustomOnChangePlugin";
import SaveNote from "./Editor/Header/SaveNote";

function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: {},
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <header className="h-header p-1.5">
        <SaveNote />
      </header>
      <RichTextPlugin
      contentEditable={<ContentEditable className="w-full h-main p-6 resize-none" />}
      placeholder={<div className="absolute w-max m-6 mt-16">내용을 입력해주세요.</div>}
      ErrorBoundary={LexicalErrorBoundary}
      />
      <CustomOnChangePlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  )
}