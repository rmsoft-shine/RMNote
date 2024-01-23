import { KeyboardEvent, useEffect, useRef } from "react";
import { useCurrentNotebook, useNotebookData } from "@/store/store";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal";
import editNotebook from "@/api/editNotebook";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editNotebookSchema } from "../Schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditModal({ onClick }: { onClick: () => void }) {
  const { isPending, run } = useApi(editNotebook);
  const currentNotebook = useCurrentNotebook((state) => state.currentNotebook);
  const setCurrentNotebook = useCurrentNotebook((state) => state.setCurrentNotebook);
  const update = useNotebookData((state) => state.setNotebookData);
  const form = useForm<z.infer<typeof editNotebookSchema>>({
    resolver: zodResolver(editNotebookSchema),
    defaultValues: {
      edit_notebook_name: "",
    },
    mode: 'onChange'
  });

  useEffect(() => {
    form.setFocus('edit_notebook_name');
  }, [form.setFocus])

  useEffect(() => {
    form.reset({
      edit_notebook_name: currentNotebook?.name,
    });
  }, [form.reset])

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
        form.setError('edit_notebook_name', {
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
      <Form {...form}>
        <form
          className="m-2"
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={keydownHandler}
          >
          <h2 className="font-bold text-lg text-center mb-2 mx-auto">
            Edit Notebook
          </h2>
          <FormField 
            control={form.control}
            name="edit_notebook_name"
            render={({ field }) => (
              <FormItem className="border-b py-4">
                <FormLabel className="text-gray-400 font-bold mr-8">Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="Enter notebook name"
                    className="rounded bg-gray-200 px-4 py-2 w-auto inline-block"
                  />
                </FormControl>
                <FormMessage className="w-full min-h-[20px] text-right my-2 text-sm text-red-500" />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid || isPending}
            className="block ml-auto mt-2 rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
            type="submit"
            >
              Update
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
