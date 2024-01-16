import Res from "./Res";
import { getDB, setDB } from "./db";

export default async function addNotebook(name: string) {
  const response = new Res<NoteDB>();

  try {
    if (name === "") {
      throw new Error("한 글자 이상 입력해야 합니다.");
    }

    const db = getDB();

    if (Object.keys(db).includes(name)) {
      throw new Error(`The name "${name}" is already taken.`);
    } else {
      const newData = {
        ...db,
        [name]: [],
      };
      setDB(newData);
      response.setData(newData);
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
