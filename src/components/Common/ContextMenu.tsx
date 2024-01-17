import deleteNote from "@/api/deleteNote";
import useApi from "@/hooks/useApi";
import { useCurrentNote } from "@/store/store";
import { useEffect, useRef } from "react";

export default function ContextMenu({
  x,
  y,
  onBlur,
  children
}: {
  x: number;
  y: number;
  onBlur: () => void;
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isClick = useRef(false);
  const update = useCurrentNote((state) => state.currentNote);
  const { run } = useApi(deleteNote);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const blurHandler = () => {
    if (isClick.current) {
      if (inputRef.current) inputRef.current.focus();
    } else {
      onBlur();
    }
  }

  const mDownHandler = () => {
    isClick.current = true;
  }

  const mUpHandler = () => {
    isClick.current = false;
  }

  return (
    <ul
      style={{ top: y + 10, left: x + 10 }}
      className={`absolute drop-shadow-2xl bg-white border rounded py-4 m-0`}
      onMouseDown={mDownHandler}
      onMouseUp={mUpHandler}
      onMouseOut={mUpHandler}
    >
      <input
        type="button"
        ref={inputRef}
        className="sr-only"
        onBlur={blurHandler}
      />
      {children}
      {/* <li
        className="hover:bg-gray-200 py-1 px-6 cursor-pointer"
        onClick={deleteCurrent}
      >
        이 노트 삭제하기
      </li> */}
    </ul>
  );
}
