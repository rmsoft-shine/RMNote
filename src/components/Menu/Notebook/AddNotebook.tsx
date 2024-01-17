import addNotebook from "@/api/addNotebook";
import Modal from "@/components/Modal";
import useApi from "@/hooks/useApi";
import { useNotebookData } from "@/store/store";
import { useEffect, useRef } from "react";

export default function AddNotebook({ onClick }: { onClick: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPending, error, run } = useApi(addNotebook);
  const update = useNotebookData((state) => state.setNotebookList);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const add = async () => {
    if (inputRef.current) {
      const res = await run(inputRef.current.value);

      if (res.ok && res.payload) {
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
            ref={inputRef}
          />
        </div>
        <p className="w-full min-h-[20px] text-right my-2 text-sm">{error}</p>
        <button
          disabled={isPending}
          className="block ml-auto rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
          type="button"
          onClick={add}
        >
          Create
        </button>
      </form>
    </Modal>
  )
}
