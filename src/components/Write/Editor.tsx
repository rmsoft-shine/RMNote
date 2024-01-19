'use client'

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useCurrentNote } from "@/store/store";
import CustomPlugin from "./Editor/CustomPlugin";
import ToolBar from "./Editor/Header/ToolBar";

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
  const currentNote = useCurrentNote((state) => state.currentNote);

  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig} key={currentNote?._id}>
      <header className="h-header bg-neutral-100 flex items-center py-2 px-4 border-stone-300 border-b gap-4">
        <ToolBar />
      </header>
      <RichTextPlugin
        contentEditable={<ContentEditable className="w-full h-main p-6 resize-none" />}
        placeholder={<div className="text-zinc-300 absolute w-max m-6 mt-16 pointer-events-none">내용을 입력해주세요.</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CustomPlugin />
      <HistoryPlugin />
    </LexicalComposer>
  )
}
