import Res from "./Res";
import { getDB, setDB } from "./db";

export default async function deleteNote(
  notebook: keyof NoteDB,
  index: keyof Note
) {
  const response = new Res<NoteDB>();

  try {
    const db = getDB();
    const target = db[notebook];
    if (!target[index]) {
      throw new Error("존재하지 않는 Note입니다.");
    } else {
      target.splice(index, 1);
      setDB(db);
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
