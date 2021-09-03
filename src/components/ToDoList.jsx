import { useGetToDoList } from "../lib/apiHooks";
import ToDoItem from "./ToDoItem";

export default function ToDoList(props) {
  const { data = [], isLoading, isFetching } = useGetToDoList();

  return (
    <ul>
      {data.map((toDoItem) => (
        <li key={toDoItem.id}>
          <ToDoItem {...toDoItem} />
        </li>
      ))}
    </ul>
  );
}
