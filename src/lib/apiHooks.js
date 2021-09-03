import { useQuery, useQueryClient, useMutation } from "react-query";
import { getToDoList, addToDo, removeToDo, editToDo } from "./api";

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

  return useMutation((toDoTitle) => editToDo(toDoTitle), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
