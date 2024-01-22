import { KeyboardEvent, useEffect } from "react";
import { useNotebookData } from "@/store/store";
import addNotebook from "@/api/addNotebook";
import useApi from "@/hooks/useApi";
import Modal from "@/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addNotebookSchema } from "../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddNotebook({ onClick }: { onClick: () => void }) {
  const { isPending, run } = useApi(addNotebook);
  const update = useNotebookData((state) => state.setNotebookData);
  const form = useForm<z.infer<typeof addNotebookSchema>>({
    resolver: zodResolver(addNotebookSchema)
  });

  useEffect(() => {
    form.setFocus('add_notebook_name');
  }, [form.setFocus])

  const onSubmit: SubmitHandler<z.infer<typeof addNotebookSchema>> = async (data) => {
    const name = data.add_notebook_name;

    const res = await run(name);

    if (res.ok && res.payload) {
      update(res.payload);
      onClick();
    } else {
      if (res.error) {
        form.setError('add_notebook_name', {
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
      <Form {...form}>
        <form
          className="m-2"
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={keydownHandler}
          >
          <h2 className="font-bold text-lg text-center mb-2 mx-auto">
            Create New Notebook
          </h2>
          <FormField 
            control={form.control}
            name="add_notebook_name"
            render={({ field }) => (
              <FormItem className="border-b py-4">
                <FormLabel className="text-gray-400 font-bold mr-8">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter notebook name"
                    className="rounded bg-gray-200 px-4 py-2"
                    {...field} />
                </FormControl>
                <FormMessage className="w-full min-h-[20px] text-right my-2 text-sm text-red-500"/>
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid || isPending}
            className="block ml-auto mt-2 rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
            type="submit"
            >
              Create
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
