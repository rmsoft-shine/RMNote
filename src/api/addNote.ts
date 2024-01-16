import Res from "./Res";
import { getDB, setDB } from "./db";

export default async function addNote(notebook: keyof NoteDB) {
  const response = new Res<Note>();

  try {
    const db = getDB();
    const newWrite = {
      content: "",
      edittedAt: new Date().toString(),
    };
    const target = db[notebook];
    const existing = target[0]?.content === "";
    if (existing) {
      response.setData({ ...newWrite, edittedAt: new Date().toString() });
      throw new Error("이미 작성 중입니다.");
    } else {
      target.unshift(newWrite);
      setDB(db);
      response.setData(newWrite);
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
