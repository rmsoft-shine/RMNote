import Res from "./Res";
import { getDB, setDB } from "./db";

export default async function deleteNotebook(name: string) {
  const response = new Res<NoteDB>();

  try {
    const db = getDB();
    if (!Object.keys(db).includes(name)) {
      throw new Error(`존재하지 않는 Notebook입니다.`);
    } else {
      delete db[name];
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
