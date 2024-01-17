import { z } from "zod";

export const notebookSchema = z.object({
  _id: z.string().cuid2(),
  name: z.string(),
  cover: z.string(),
  parent: z.string().cuid2().nullable(),
});

export type NotebookType = z.infer<typeof notebookSchema>;

export const notebookDataSchema = z.record(z.string().cuid2(), notebookSchema);

export type NotebookDataType = z.infer<typeof notebookDataSchema>;
