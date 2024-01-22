import Res from "./Res";
import { createId } from "@paralleldrive/cuid2";
import { getNotebook, setNotebook } from "./db";
import { NotebookDataType, notebookSchema } from "@/types/notebook";

export default async function addNotebook(name: string, parent: string | null = null) {
  const response = new Res<NotebookDataType>();

  try {
    if (name === "") {
      throw new Error("한 글자 이상 입력해야 합니다.");
    }
    if (name.length > 100) {
      throw new Error("노트북 이름은 100자 이내로만 가능합니다.");
    }

    const db = getNotebook();

    const duplicatedCheck = Object.values(db)
        .filter((notebook) => notebook.parent === parent)
        .filter((notebook) => notebook.name === name)
        .length > 0;

    if (duplicatedCheck) {
      throw new Error(`The name "${name}" is already taken.`);
    } else {
      const id = createId();
      const newNotebook = {
        _id: id,
        name: name,
        cover: "red",
        parent: parent,
      };

      const parse = notebookSchema.safeParse(newNotebook);

      if (parse.success) {
        const newData = {
          ...db,
          [id]: parse.data
        }

        setNotebook(newData);
        response.setData(newData);
        response.setOk();
      } else {
        console.log(parse.error);
        throw new Error('잘못된 데이터 형식입니다.');
      }
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
