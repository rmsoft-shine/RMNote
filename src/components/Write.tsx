'use client'

import { useCurrentNote } from '@/store/store';
import Editor from './Write/Editor';

export default function Write() {
  const currentNote = useCurrentNote((state) => state.currentNote);

  return (
    <section className="grow flex flex-col relative">
      {currentNote && <Editor />}
    </section>
  );
}