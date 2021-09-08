import { useState } from "react";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import CheckCircleOutlineTwoToneIcon from "@material-ui/icons/CheckCircleOutlineTwoTone";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

import { useEditToDo, useRemoveAddToDo } from "../lib/apiHooks";

export default function ToDoItem(props) {
  const { id, isDone, title } = props;
  const editToDo = useEditToDo();
  const removeToDo = useRemoveAddToDo();
  const [isHover, setIsHover] = useState(false);
  const [isHoverDelete, setIsHoverDelete] = useState(false);

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

  const toDoContainerClasses = `todo rounded border border-gray-300 mb-2 hover:shadow transition duration-150 ease-in-out overflow-hidden group flex justify-between items-stretch ${
    isDone ? "bg-gray-100" : "bg-white"
  }`;

  return (
    <div className={toDoContainerClasses}>
      <label
        htmlFor={title}
        className="p-4"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleToggle}
          id={title}
          className="mr-2 hidden"
        />
        <span className="inline-block mr-2">
          {isDone && (
            <CheckCircleTwoToneIcon className="text-green-700 opacity-50" />
          )}
          {!isHover && !isDone && (
            <RadioButtonUncheckedIcon className="text-gray-400" />
          )}
          {isHover && !isDone && (
            <CheckCircleOutlineTwoToneIcon className="text-green-700 " />
          )}
        </span>
        <span className={isDone ? "line-through opacity-50" : ""}>{title}</span>
      </label>
      <button
        aria-label="Remove To Do"
        onClick={handleRemove}
        className="px-3 h-100 opacity-0 group-hover:opacity-100"
        onMouseOver={() => setIsHoverDelete(true)}
        onMouseLeave={() => setIsHoverDelete(false)}
      >
        {!isHoverDelete && (
          <DeleteOutlineTwoToneIcon className="text-gray-700 opacity-50" />
        )}
        {isHoverDelete && <DeleteTwoToneIcon className="text-red-600" />}
      </button>
    </div>
  );
}
