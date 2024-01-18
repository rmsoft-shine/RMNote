import { useCurrentNote } from "@/store/store";
import { NoteType } from "@/types/note";
import { PointerEvent, useRef, useState } from "react";
import ContextMenu from "../Common/ContextMenu";
import DeleteThis from "./ContextMenu/DeleteThis";

export default function ListItem({ note }: { note: NoteType }) {
  const [isContext, setIsContext] = useState(false);
  const currentNote = useCurrentNote((state) => state.currentNote);
  const update = useCurrentNote((state) => state.setCurrentNote);
  const pos = useRef({ x: 0, y: 0 });

  let title = "", content = "";
  const noteContent = note.content as any;
  if (noteContent) {
    const children = noteContent.root.children.filter((c: any) => c.children.length > 0); // 1 depth
    if (children.length > 1) {
      if (children[0].children.length) {
        children[0].children.forEach((node: any) => title += node.text);
      }
      if (children[1].children.length) {
        children[0].children.forEach((node: any) => content += node.text);
      }
    }
    else if (children.length === 1) {
      const textNode = children[0].children;
      if (textNode.length) {
        textNode.forEach((node: any) => title += node.text);
      }
    }
  }

  const selectThis = () => {
    update(note);
  }

  const contextHandler = (event: PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    pos.current.x = event.pageX;
    pos.current.y = event.pageY;
    selectThis();
    setIsContext(true);
  }

  const isSelected = currentNote?._id === note._id;

  return (
    <>
      <li
          className={`p-6 w-full cursor-pointer space-y-3 ${
            isSelected ? "bg-blue-100" : ""
          }`}
          onClick={selectThis}
          onContextMenu={contextHandler}
        >
          <h3 className="text-lg font-bold h-6 overflow-hidden text-nowrap text-ellipsis">{title || "New Note"}</h3>
          <p className="h-6 overflow-hidden text-nowrap text-ellipsis">{content || "No additional text"}</p>
          <time className="block text-xs text-gray-400">
            {timeFormat(note.edittedAt)}
          </time>
        </li>
        {isContext && (
          <ContextMenu
          x={pos.current.x}
          y={pos.current.y}
          onBlur={() => { setIsContext(false) }}
          >
            <DeleteThis id={note._id}/>
          </ContextMenu>
        )}
      </>
  )
}

/* utils */
const timeFormat = (time: string) => {
  const date = new Date(time);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  ); // 초-분-시-일
  let day;
  if (diff > 0) day = `${diff}일 전`;
  else if (diff === 0) {
    if (now.getDay() === date.getDay()) day = "Today";
    else if (now.getDate() > date.getDay()) day = "1일 전";
  } else if (diff < 0) {
    day = `${Math.abs(diff)}일 후`;
  }
  return `${day}, ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
