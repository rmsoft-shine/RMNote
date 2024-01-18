'use client'

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import CustomOnChangePlugin from "./Editor/CustomOnChangePlugin";
import SaveNote from "./Editor/Header/SaveNote";
import ToolBar from "./Editor/Header/ToolBar";
import DisablePlugin from "./Editor/DisablePlugin";

const theme = {
  paragraph: "mb-1",
  rtl: "text-right",
  ltr: "text-left",
  image: "editor-image",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through"
  }
}

function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    onError,
  };

  console.log('editor render');

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <header className="h-header bg-neutral-100 flex items-center py-2 px-4 border-stone-300 border-b gap-4">
        <SaveNote />
        <ToolBar />
      </header>
      <RichTextPlugin
        contentEditable={<ContentEditable className="w-full h-main p-6 resize-none" />}
        placeholder={<div className="absolute w-max m-6 mt-16">내용을 입력해주세요.</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CustomOnChangePlugin />
      <DisablePlugin />
      <HistoryPlugin />
    </LexicalComposer>
  )
}
