const storage = "rmnote";
const getDB = () => JSON.parse(localStorage.getItem(storage) || "{}");
const setDB = (db: NoteDB) => localStorage.setItem(storage, JSON.stringify(db));

export { storage, getDB, setDB };
