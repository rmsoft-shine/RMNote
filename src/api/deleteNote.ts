import { NoteDataType } from "@/types/note";
import Res from "./Res";
import { getNote, setNote } from "./db";

export default async function deleteNote(_id: string) {
  const response = new Res<NoteDataType>();

  try {
    const db = getNote();
    const target = db[_id];

    if (!target) {
      throw new Error("존재하지 않는 Note입니다.");
    } else {
      delete db[_id];
      setNote(db);
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
