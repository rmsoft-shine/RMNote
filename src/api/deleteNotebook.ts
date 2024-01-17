import Res from "./Res";
import { getNote, getNotebook, setNote, setNotebook } from "./db";
import { NotebookDataType } from "@/types/notebook";

export default async function deleteNotebook(_id: string) {
  const response = new Res<NotebookDataType>();

  try {
    const db = getNotebook();
    const noteDB = getNote();
    const notes = Object.values(noteDB).filter((note) => note.notebook === _id);
    if (!Object.keys(db).includes(_id)) {
      throw new Error(`존재하지 않는 Notebook입니다.`);
    } else {
      delete db[_id];
      setNotebook(db);
      // note 삭제
      notes.forEach((note) => {
        delete noteDB[note._id];
      })
      setNote(noteDB);
      //
      response.setData(db);
      response.setOk();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.setError(error);
    }
  } finally {
    return response;
  }
}
