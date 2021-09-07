import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getToDoList,
  addToDo,
  removeToDo,
  editToDo,
  reorderToDoList,
  getToDoListOrder,
} from "./api";

export const useGetToDoListOrder = () => useQuery("userInfo", getToDoListOrder);

export const useGetToDoList = () => useQuery("todos", getToDoList);

export const useAddToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((toDoTitle) => addToDo(toDoTitle), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useRemoveAddToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => removeToDo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useEditToDo = () => {
  const queryClient = useQueryClient();

  return useMutation((toDoItem) => editToDo(toDoItem), {
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
