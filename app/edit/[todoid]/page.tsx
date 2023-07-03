import { handleUpdateTodo } from "@/app/action";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditTodoPage({
  params,
}: {
  params: { todoid: string };
}) {
  const { todoid } = params;
  const todo = await prisma.todo.findFirst({ where: { id: Number(todoid) } });

  if (!todo) {
    redirect("/");
  }
  return (
    <form action={handleUpdateTodo}>
      <h1>{todo?.title}</h1>
      <input readOnly type="hidden" value={todoid} name="todoid" />
      <label className="block text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        defaultValue={todo.title}
        type="text"
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Update
      </button>
    </form>
  );
}
