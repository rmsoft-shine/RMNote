'use client'

import { useRef } from 'react';
import { EditorState } from 'lexical';
import { useCurrentNote } from '@/store/store';
import Suggestion from './Write/Suggestion';
import editNote from '@/api/editNote';
import Editor from './Write/Editor';

export default function Write() {
  const currentNote = useCurrentNote((state) => state.currentNote);
  const setCurrentNote = useCurrentNote((state) => state.setCurrentNote);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // const onChange = async () => {
  //   if (timer.current) clearTimeout(timer.current);
  //   timer.current = setTimeout(() => edit())
  // }

  return (
    <section className="grow flex flex-col">
      {
        currentNote ? (
          <Editor />
        ) : (
          <Suggestion />
        )
      }
      
    </section>
  );
}