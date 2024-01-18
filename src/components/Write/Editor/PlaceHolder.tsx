import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function PlaceHolder() {
  const [editor] = useLexicalComposerContext();

  if (editor.isEditable()) {
    return (<div className="absolute w-max m-6 mt-16">내용을 입력해주세요.</div>)
  } else return null;
}
