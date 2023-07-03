import Link from "next/link";
import { handleToggleTodo } from "./action";
import prisma from "./lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = "no-store";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <main>
      <h1 className="mb-16 text-gray-900 text-7xl dark:text-white">To do</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <article className="block md:max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full h-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {todo.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Status: {todo.completed ? "Completed" : "Uncompleted"}
                </p>

                <form action={handleToggleTodo} className="mb-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="submit"
                      value={todo.id}
                      name="todoid"
                      readOnly
                      hidden
                    />
                    <input
                      type="checkbox"
                      checked={todo.completed || false}
                      className="sr-only peer"
                      readOnly
                    />

                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Toggle me
                    </span>
                  </label>
                </form>

                <Link
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  href={`/edit/${todo.id}`}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Edit
                  </span>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
