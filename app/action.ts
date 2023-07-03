"use server";

import { revalidatePath } from "next/cache";
import prisma from "./lib/prisma";

export const handleUpdateTodo = async (data: FormData) => {
  const title = data.get("title") as string;
  const todoId = data.get("todoid");

  if (!title || !todoId) {
    return;
  }

  await prisma.todo.update({
    where: {
      id: Number(todoId),
    },
    data: {
      title,
    },
  });

  revalidatePath("/");
  revalidatePath("/edit/[todoid]");
};

export const handleToggleTodo = async (data: FormData) => {
  const todoId = data.get("todoid");

  if (!todoId) {
    return;
  }
  const todo = await prisma.todo.findFirst({ where: { id: Number(todoId) } });

  await prisma.todo.update({
    where: {
      id: Number(todoId),
    },
    data: {
      completed: !todo?.completed,
    },
  });

  revalidatePath("/");
};
