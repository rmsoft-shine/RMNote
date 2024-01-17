'use client'

import { MouseEvent, useEffect, useState } from "react"
import { useNotebookData } from "@/store/store";
import { getNotebook } from "@/api/db";
import ButtonIcon from "../Common/Buttonicon";
import ListItem from "./Notebook/ListItem";
import AddNotebook from "./Notebook/AddNotebook";

export default function Notebook() {
  const [isMore, setIsMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const notebookData = useNotebookData((state) => state.notebookData);
  const setNotebookData = useNotebookData((state) => state.setNotebookData);

  const list = Object.entries(notebookData);
  
  const isMoreHandler = () => {
    setIsMore((prev) => !prev);
  }

  useEffect(() => {
    setNotebookData(getNotebook());
  }, [])

  return (
    <article>
      <h2
        className="flex items-center p-1 pl-0 cursor-pointer"
        onClick={isMoreHandler}
      >
        <ButtonIcon
          icon={isMore ? "expand_more" : "chevron_right"}
          className="text-gray-500 hover:text-gray-700"
        />
        <span className="font-bold text-blue-600 grow text-ellipsis overflow-hidden">
          NOTEBOOKS
        </span>
        <ButtonIcon
          icon="add"
          className="text-blue-600"
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            setIsModal(true)
          }}
          />
      </h2>
      {isMore && (
        <ul className="w-full transition">
          {list.map((entries) => {
            const notebook = entries[1]; 
            return (
              <ListItem
                notebook={notebook}
                key={notebook._id}
              />
            );
          })}
        </ul>
      )}
      {isModal && <AddNotebook onClick={() => setIsModal(false)}/>}
    </article>
  )
}
