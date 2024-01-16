import Res from "./Res";
import { getDB, storage } from "./db";

export default async function editNote(
  notebook: keyof NoteDB,
  index: number,
  content: string
) {
  const response = new Res<CurrentNote>();

  try {
    const db = getDB();
    const write = { content, edittedAt: new Date().toString() };
    const target = db[notebook];
    target[index] = write;
    localStorage.setItem(storage, JSON.stringify(db));

    response.setData({
      index: index,
      note: write,
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
