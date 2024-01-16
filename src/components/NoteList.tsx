'use client'

import { useCurrentNotebook } from "@/store/store";
import ButtonIcon from "./Common/Buttonicon";

export default function NoteList() {
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);

  return (
    <section className="overflow-auto basis-60 grow-0">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-stone-300 border-b">
        {currentNotebook ? (
          <>
            <h2 className="max-w-44 whitespace-nowrap">
              {/* {currentNotebook.name} */}
            </h2>
            <ButtonIcon icon="more_horiz" />
          </>
        ) : null}
      </header>
      {currentNotebook && (
        <ol className="divide-y">
          {/* {currentNotebook.notebook.map((note, i) => {
            return <ListItem {...note} index={i} key={i} />;
          })} */}
        </ol>
      )}
    </section>
  );
}
