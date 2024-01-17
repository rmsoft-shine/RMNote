import Res from "./Res";
import { createId } from "@paralleldrive/cuid2";
import { getNote, setNote } from "./db";
import { NoteType } from "@/types/note";
import { NotebookDataType } from "@/types/notebook";

export default async function addNote(_id: keyof NotebookDataType) {
  const response = new Res<NoteType>();

  try {
    const db = getNote();

    const id = createId();
    const newWrite = {
      _id: id,
      notebook: _id,
      content: null,
      edittedAt: new Date().toString(),
    }; // new Note Data

    const newData = {
      ...db,
      [id]: newWrite
    }

    setNote(newData);
    response.setData(newWrite);
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
