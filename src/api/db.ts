import { NoteDataType } from "@/types/note";
import { NotebookDataType } from "@/types/notebook";

const notebookStorage = 'rm_notebook';
const noteStorage = 'rm_note';
const getNotebook = (): NotebookDataType => JSON.parse(localStorage.getItem(notebookStorage) || "{}");
const setNotebook = (notebookData: NotebookDataType) => localStorage.setItem(notebookStorage, JSON.stringify(notebookData));
const getNote = (): NoteDataType => JSON.parse(localStorage.getItem(noteStorage) || "{}");
const setNote = (noteData: NoteDataType) => localStorage.setItem(noteStorage, JSON.stringify(noteData));

export { getNotebook, setNotebook, getNote, setNote };