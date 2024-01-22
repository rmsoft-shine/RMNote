'use client'

import { useCurrentNotebook, useNoteData } from "@/store/store";
import ButtonIcon from "./Common/Buttonicon";
import ListItem from "./NoteList/ListItem";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { NoteType } from "@/types/note";
import Menu from "./NoteList/Header/Menu";
import EditModal from "./NoteList/Header/EditModal";

export default function NoteList() {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [noteList, setNoteList] = useState<NoteType[]>([]);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const noteData = useNoteData((state) => state.noteData);
  const pos = useRef({ x: 0, y: 0});

  useEffect(() => {
    const notes = Object.values(noteData)
      .filter((note) => note.notebook === currentNotebook?._id)
      .sort(() => -1);

    setNoteList(notes);
  }, [currentNotebook, noteData])
  
  const onClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    pos.current.x = event.clientX;
    pos.current.y = event.clientY;
    setIsMenu(true);
  }

  return (
    <section className="overflow-auto basis-60 grow-0">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-stone-300 border-b">
        {currentNotebook && (
          <>
            <h2
              className="max-w-44 whitespace-nowrap cursor-default"
              title={currentNotebook.name}
              >
              {currentNotebook.name}
            </h2>
            <ButtonIcon 
              icon="more_horiz"
              onClick={onClickHandler}
              />
            {isMenu &&
              <Menu
                x={pos.current.x}
                y={pos.current.y}
                onClick={() => setIsMenu(false)}
                onModal={() => setIsModal(true)}
              >
                <></>
              </Menu>}
              {isModal && <EditModal onClick={() => setIsModal(false)}/>}
          </>
        )}
      </header>
      {currentNotebook && (
        <ol className="divide-y">
          {noteList.map((note) => {
            return <ListItem note={note} key={note._id} />;
          })}
        </ol>
      )}
    </section>
  );
}
