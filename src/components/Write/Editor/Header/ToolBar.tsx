import ButtonIcon from "@/components/Common/Buttonicon";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot, BLUR_COMMAND, COMMAND_PRIORITY_NORMAL, FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { useEffect, useState } from "react";

export default function ToolBar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const update = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (event) => {
              const parent = event.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          update();
        });
      })
    );
  }, [editor])

  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
        () => {
          setIsBold(false);
          setIsItalic(false);
          setIsStrikethrough(false);
          setIsUnderline(false);
          return false;
      },
      COMMAND_PRIORITY_NORMAL)
  })

  const textCommandDispatch = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  }

  return (
    <article className="space-x-1">
      <ButtonIcon
        icon="format_bold"
        onClick={() => textCommandDispatch("bold")}
        className={"rounded hover:bg-indigo-300" + (isBold ? " bg-indigo-300" : "")}
       />
      <ButtonIcon
        icon="format_strikethrough"
        onClick={() => textCommandDispatch("strikethrough")}
        className={"rounded hover:bg-indigo-300" + (isStrikethrough ? " bg-indigo-300" : "")}
        />
      <ButtonIcon
      icon="format_italic"
      onClick={() => textCommandDispatch("italic")}
      className={"rounded hover:bg-indigo-300" + (isItalic ? " bg-indigo-300" : "")}
      />
      <ButtonIcon
      icon="format_underlined"
      onClick={() => textCommandDispatch("underline")}
      className={"rounded hover:bg-indigo-300" + (isUnderline ? " bg-indigo-300" : "")}
      />
    </article>
  )
}
