import ButtonIcon from "@/components/Common/Buttonicon";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot, BLUR_COMMAND, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_LOW, COMMAND_PRIORITY_NORMAL, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, TextFormatType, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { useEffect, useState } from "react";

export default function ToolBar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
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
      setIsCode(selection.hasFormat("code"));
      setIsHighlight(selection.hasFormat("highlight"))
    }
  }

  // useEffect(() => {
  //   return editor.registerCommand(
  //     SELECTION_CHANGE_COMMAND,
  //     (_payload, newEditor) => {
  //       update();
  //       setActiveEditor(newEditor);
  //       return false;
  //     },
  //     COMMAND_PRIORITY_CRITICAL
  //   )
  // }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          update();
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      )
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
        icon="undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className={"rounded hover:bg-indigo-300 disabled:text-slate-400"}
        disabled={!canUndo}
       />
      <ButtonIcon
        icon="redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className={"rounded hover:bg-indigo-300 disabled:text-slate-400"}
        disabled={!canRedo}
       />
      <span className="text-indigo-300">|</span>
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
      <ButtonIcon
        icon="code"
        onClick={() => textCommandDispatch("code")}
        className={"rounded hover:bg-indigo-300" + (isCode ? " bg-indigo-300" : "")}
      />
      <ButtonIcon
        icon="drive_file_rename_outline"
        onClick={() => textCommandDispatch("highlight")}
        className={"rounded hover:bg-indigo-300" + (isHighlight ? " bg-indigo-300" : "")}
      />
      <span className="text-indigo-300">|</span>
      <ButtonIcon
        icon="format_align_left"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className={"rounded hover:bg-indigo-300"}
      />
      <ButtonIcon
        icon="format_align_center"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className={"rounded hover:bg-indigo-300"}
      />
      <ButtonIcon
        icon="format_align_right"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        className={"rounded hover:bg-indigo-300"}
      />
      <ButtonIcon
        icon="format_align_justify"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        className={"rounded hover:bg-indigo-300"}
      />
      <span className="text-indigo-300">|</span>
      
    </article>
  )
}
