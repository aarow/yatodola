import { useEditToDo, useRemoveAddToDo } from "../lib/apiHooks";

export default function ToDoItem(props) {
  const { id, isDone, title } = props;
  const editToDo = useEditToDo();
  const removeToDo = useRemoveAddToDo();

  const handleToggle = () => {
    editToDo.mutate({
      id,
      isDone: !isDone,
      title,
    });
  };

  const handleRemove = () => {
    removeToDo.mutate(id);
  };

  return (
    <div className="flex justify-between">
      <label htmlFor={title} className={isDone ? "line-through" : ""}>
        <span>
          <input
            type="checkbox"
            defaultChecked={isDone}
            onChange={handleToggle}
            id={title}
          />
        </span>{" "}
        <span>{title}</span>
      </label>
      <button
        aria-label="Remove To Do"
        onClick={handleRemove}
        className="btn-delete btn-small"
      >
        &times;
      </button>
    </div>
  );
}
