import Res from "./Res";
import { getNotebook, setNotebook } from "./db";
import { NotebookDataType } from "@/types/notebook";

export default async function editNotebook(
    _id: keyof NotebookDataType,
    name: string
    ) {
  const response = new Res<NotebookDataType>();

  try {
    if (!_id) {
      throw new Error("노트북을 지정해야 합니다.");
    }
    if (name.length < 1) {
      throw new Error("한 글자 이상 입력해야 합니다.");
    }

    const db = getNotebook();

    const target = db[_id];
    if (!target) {
      throw new Error("해당 노트북을 찾을 수 없습니다.");
    }

    const duplicatedCheck = Object.values(db)
      .filter((notebook) => notebook.parent === db[_id].parent)
      .filter((notebook) => notebook.name === name)
      .length > 0;
    
    if (duplicatedCheck) {
      throw new Error(`The name "${name}" is already taken.`);
    } else {
      target.name = name.trim();

      const newData = {
        ...db,
      }
  
      setNotebook(newData);
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
