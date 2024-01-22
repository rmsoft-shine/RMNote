import { KeyboardEvent, useEffect, useRef } from "react";
import { useCurrentNotebook, useNotebookData } from "@/store/store";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal";
import editNotebook from "@/api/editNotebook";

export default function EditModal({ onClick }: { onClick: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPending, error, run } = useApi(editNotebook);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const setCurrentNotebook = useCurrentNotebook((state) => state.setCurrentNotebook);
  const update = useNotebookData((state) => state.setNotebookData);

  useEffect(() => {
    if (inputRef.current) {
      if (currentNotebook) {
        inputRef.current.value = currentNotebook.name;
      }
      inputRef.current.focus();
    }
  }, []);

  const keydownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await edit();
    }
    if (event.key === 'Escape') {
      onClick();
    }
  }

  const edit = async () => {
    if (inputRef.current) {
      if (inputRef.current.value.length > 100) {
        alert('노트북 이름은 100자 이내로만 가능합니다.');
        return;
      }
      const res = await run(currentNotebook?._id, inputRef.current.value);

      if (res.ok && res.payload) {
        if (currentNotebook) {
          setCurrentNotebook(res.payload[currentNotebook?._id])
        }
        update(res.payload);
        onClick();
      } else {
        if (res.error) {
          alert(
            res.error.message || 'NOTEBOOK 정보를 업데이트 하지 못했습니다.'
          )
        }
      }
    }
  }

  return (
    <Modal onClick={onClick}>
      <form onSubmit={(event) => event.preventDefault()}>
        <h2 className="font-bold text-lg text-center mb-2 mx-auto">
          Create New Notebook
        </h2>
        <div className="border-b py-4">
          <label
            className="text-gray-400 font-bold mr-8"
            htmlFor="add_notebook_name"
          >
            Name
          </label>
          <input
            className="rounded bg-gray-200 px-4 py-2"
            id="add_notebook_name"
            type="text"
            placeholder="Enter notebook name"
            onKeyDown={keydownHandler}
            ref={inputRef}
          />
        </div>
        <p className="w-full min-h-[20px] text-right my-2 text-sm">{error}</p>
        <button
          disabled={isPending}
          className="block ml-auto rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
          type="button"
          onClick={edit}
        >
          Update
        </button>
      </form>
    </Modal>
  )
}
