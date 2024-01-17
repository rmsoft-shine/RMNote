import { MouseEvent } from "react";

export default function Modal({
  onClick,
  children,
}: {
  onClick: (event?: MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={onClick}
    >
      <div
        className="bg-white rounded p-8"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
