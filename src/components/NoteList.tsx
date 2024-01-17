'use client'

import { useCurrentNote, useCurrentNotebook } from "@/store/store";
import ButtonIcon from "./Common/Buttonicon";
import { getNote } from "@/api/db";
import ListItem from "./NoteList/ListItem";
import { useEffect, useState } from "react";
import { NoteType } from "@/types/note";

export default function NoteList() {
  const [noteList, setNoteList] = useState<NoteType[]>([]);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const currentNote = useCurrentNote((state) => state.currentNote);

  useEffect(() => {
    const notes = Object.values(getNote())
      .filter((note) => note.notebook === currentNotebook?._id)
      .sort(() => -1);

    setNoteList(notes);
  }, [currentNotebook, currentNote])
  

  return (
    <section className="overflow-auto basis-60 grow-0">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-stone-300 border-b">
        {currentNotebook && (
          <>
            <h2 className="max-w-44 whitespace-nowrap">
              {currentNotebook.name}
            </h2>
            <ButtonIcon icon="more_horiz" />
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
