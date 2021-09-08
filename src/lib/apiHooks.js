import { v4 as uuidv4 } from "uuid";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getToDoList,
  addToDo,
  removeToDo,
  editToDo,
  reorderToDoList,
  getToDoListOrder,
  checkAll,
} from "./api";

export const useGetToDoListOrder = () => useQuery("userInfo", getToDoListOrder);

export const useGetToDoList = () => useQuery("todos", getToDoList);

export const useAddToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((toDoTitle) => addToDo(toDoTitle), {
    onMutate: async (toDoTitle) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("todos");

      // Snapshot the previous value
      const previousTodoList = queryClient.getQueryData("todos");

      // Optimistically update to the new value
      queryClient.setQueryData("todos", (old) => [
        {
          id: uuidv4(),
          title: toDoTitle,
          isDone: false,
        },
        ...previousTodoList,
      ]);

      // Return a context with the previous and new todo
      return previousTodoList;
    },

    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useRemoveAddToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => removeToDo(id), {
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("todos");

      // Snapshot the previous value
      const previousTodoList = queryClient.getQueryData("todos");

      // Optimistically update to the new value
      queryClient.setQueryData("todos", (old) =>
        previousTodoList.filter((currentToDo) => currentToDo.id !== id)
      );

      // Return a context with the previous and new todo
      return previousTodoList;
    },

    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useEditToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((toDoItem) => editToDo(toDoItem), {
    onMutate: async (toDoItem) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("todos");

      // Snapshot the previous value
      const previousTodoList = queryClient.getQueryData("todos");

      // Optimistically update to the new value
      queryClient.setQueryData("todos", (old) =>
        previousTodoList.map((currentToDo) =>
          currentToDo.id === toDoItem.id ? toDoItem : currentToDo
        )
      );

      // Return a context with the previous and new todo
      return previousTodoList;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useCheckAll = () => {
  const queryClient = useQueryClient();

  return useMutation((isDoneValue) => checkAll(isDoneValue), {
    onMutate: async (isDoneValue) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("todos");

      // Snapshot the previous value
      const previousTodoList = queryClient.getQueryData("todos");

      // Optimistically update to the new value
      queryClient.setQueryData("todos", (old) =>
        previousTodoList.map((currentToDo) => ({
          ...currentToDo,
          isDone: isDoneValue,
        }))
      );

      // Return a context with the previous and new todo
      return previousTodoList;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useUpdateUserToDoListOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (toDoListOrderArray) => {
      return reorderToDoList(toDoListOrderArray);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
};
