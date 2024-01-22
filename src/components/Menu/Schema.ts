import { z } from "zod";

export const addNotebookSchema = z.object({
  add_notebook_name: z.string()
    .min(1, {
      message: "한 글자 이상 입력해야 합니다."
    })
    .max(100, {
      message: "Notebook 이름은 100자를 넘을 수 없습니다."
    })
})