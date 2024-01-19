'use client'

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { useCurrentNote } from "@/store/store";
import CustomPlugin from "./Editor/CustomPlugin";
import ToolBar from "./Editor/Header/ToolBar";

const EDITOR_NODES = [
  HeadingNode,
  ListNode,
  ListItemNode,
  LinkNode,
  QuoteNode,
  CodeNode,
];

const theme = {
  paragraph: "mb-1",
  rtl: "text-right",
  ltr: "text-left",
  image: "editor-image",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-amber-100 p-1 font-mono"
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
    nodes: EDITOR_NODES,
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
