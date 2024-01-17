import Res from "./Res";
import { NoteType } from "@/types/note";
import { getNote, setNote } from "./db";
import { SerializedEditorState } from "lexical";

export default async function editNote(
  _id: string,
  editorState: SerializedEditorState,
) {
  const response = new Res<NoteType>();

  try {
    const db = getNote();
    const target = db[_id];

    const write = { 
      ...target,
      content: editorState,
      edittedAt: new Date().toString()
    };

    const newData = {
      ...db,
      [_id]: {
        ...write
      }
    };

    setNote(newData);

    response.setData({
      ...write
    });
    response.setOk();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.setError(error);
    }
  } finally {
    return response;
  }
}
