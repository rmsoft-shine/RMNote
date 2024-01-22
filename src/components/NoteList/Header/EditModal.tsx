import { KeyboardEvent, useEffect, useRef } from "react";
import { useCurrentNotebook, useNotebookData } from "@/store/store";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal";
import editNotebook from "@/api/editNotebook";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditModal({ onClick }: { onClick: () => void }) {
  const { isPending, error, run } = useApi(editNotebook);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const setCurrentNotebook = useCurrentNotebook((state) => state.setCurrentNotebook);
  const update = useNotebookData((state) => state.setNotebookData);
  const {
    register,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<{ edit_notebook_name: string }>();

  useEffect(() => {
    setFocus('edit_notebook_name');
  }, [setFocus])

  useEffect(() => {
    reset({
      edit_notebook_name: currentNotebook?.name,
    });
  }, [reset])

  const keydownHandler = async (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      onClick();
    }
  }

  const onSubmit: SubmitHandler<{ edit_notebook_name: string }> = async (data) => {
    const id = currentNotebook?._id;
    const name = data.edit_notebook_name;

    const res = await run(id, name);
    
    if (res.ok && res.payload) {
      if (currentNotebook) {
        setCurrentNotebook(res.payload[currentNotebook?._id])
      }
      update(res.payload);
      onClick();
    } else {
      if (res.error) {
        setError('edit_notebook_name', {
          type: 'duplicated',
          message: res.error.message,
        })
        console.log('NOTEBOOK 정보를 업데이트 하지 못했습니다.');
        console.error(res.error.message);
      }
    }
  }

  return (
    <Modal onClick={onClick}>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={keydownHandler}>
        <h2 className="font-bold text-lg text-center mb-2 mx-auto">
          Edit Notebook
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
            {...register('edit_notebook_name', {
              required: "한 글자 이상 입력해야 합니다.",
              maxLength: {
                value: 100,
                message: "Notebook 이름은 100자를 넘을 수 없습니다."
              },
              onChange: (e) => {
                if (!e.target.value) setError('edit_notebook_name', {
                  type: 'required',
                  message: '한 글자 이상 입력해야 합니다.'
                })
                else if (e.target.value.length > 100) setError('edit_notebook_name', {
                  type: 'maxLength',
                  message: 'Notebook 이름은 100자를 넘을 수 없습니다.'
                })
                else clearErrors();
              }
              })}
          />
        </div>
        <p className="w-full min-h-[20px] text-right my-2 text-sm text-red-500">
          {errors.edit_notebook_name?.message || error}
        </p>
        <button
          disabled={!isValid || isPending}
          className="block ml-auto rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
          type="submit"
        >
          Update
        </button>
      </form>
    </Modal>
  )
}
