import Res from "./Res";
import { getNotebook, setNotebook } from "./db";
import { NotebookDataType } from "@/types/notebook";

export default async function deleteNotebook(_id: string) {
  const response = new Res<NotebookDataType>();

  try {
    console.log('in try')
    const db = getNotebook();
    if (!Object.keys(db).includes(_id)) {
      throw new Error(`존재하지 않는 Notebook입니다.`);
    } else {
      delete db[_id];
      setNotebook(db);
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
