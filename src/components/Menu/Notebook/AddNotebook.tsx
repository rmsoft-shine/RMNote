import { KeyboardEvent, useEffect } from "react";
import { useNotebookData } from "@/store/store";
import addNotebook from "@/api/addNotebook";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";

export default function AddNotebook({ onClick }: { onClick: () => void }) {
  const { isPending, run } = useApi(addNotebook);
  const update = useNotebookData((state) => state.setNotebookData);
  const {
    register,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<{ add_notebook_name: string }>();

  useEffect(() => {
    setFocus('add_notebook_name');
  }, [setFocus])

  const onSubmit: SubmitHandler<{ add_notebook_name: string }> = async (data) => {
    const name = data.add_notebook_name;

    const res = await run(name);

    if (res.ok && res.payload) {
      update(res.payload);
      onClick();
    } else {
      if (res.error) {
        setError('add_notebook_name', {
          type: 'duplicated',
          message: res.error.message,
        })
        console.log('Notebook 정보를 업데이트하지 못했습니다.');
        console.error(res.error.message);
      }
    }
  }

  const keydownHandler = async (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      onClick();
    }
  }

  return (
    <Modal onClick={onClick}>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={keydownHandler}>
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
            id="add_notebook_name"
            className="rounded bg-gray-200 px-4 py-2"
            type="text"
            placeholder="Enter notebook name"
            {...register('add_notebook_name', {
              required: "한 글자 이상 입력해야 합니다.",
              maxLength: {
                value: 100,
                message: "Notebook 이름은 100자를 넘을 수 없습니다."
              },
              onChange: (e) => {
                if (!e.target.value) setError('add_notebook_name', {
                  type: 'required',
                  message: '한 글자 이상 입력해야 합니다.'
                })
                else if (e.target.value.length > 100) setError('add_notebook_name', {
                  type: 'maxLength',
                  message: 'Notebook 이름은 100자를 넘을 수 없습니다.'
                })
                else clearErrors();
              }
              })}
          />
        </div>
        <p className="w-full min-h-[20px] text-right my-2 text-sm text-red-500">
          {errors.add_notebook_name?.message}
        </p>
        <button
          disabled={!isValid || isPending}
          className="block ml-auto rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
        >
          Create
        </button>
      </form>
    </Modal>
  )
}
