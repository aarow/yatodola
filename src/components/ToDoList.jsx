import React from "react";
import { List, arrayMove, arrayRemove } from "baseui/dnd-list";
import {
  useGetToDoListOrder,
  useGetToDoList,
  useUpdateUserToDoListOrder,
} from "../lib/apiHooks";
import ToDoItem from "./ToDoItem";

export default function ToDoList(props) {
  const toDoListOrderArray = useGetToDoListOrder();
  const { data = [], isLoading, isFetching } = useGetToDoList();
  const updateUserToDoListOrder = useUpdateUserToDoListOrder();

  const handleChangeOrder = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(toDoListOrderArray.data, oldIndex, newIndex);
    console.log(newOrder);
    updateUserToDoListOrder.mutate(newOrder);
  };

  return (
    <>
      <List
        items={data.map((toDoItem) => (
          <ToDoItem key={toDoItem.id} {...toDoItem} />
        ))}
        onChange={handleChangeOrder}
      />
    </>
  );
}
