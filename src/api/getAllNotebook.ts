import Res from "./Res";
import { getDB } from "./db";

export default async function getAllNotebook() {
  const response = new Res<NotebookList>();

  try {
    const db = getDB();
    response.setData(Object.entries(db));
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
