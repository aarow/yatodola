import React, { useState, useRef } from "react";
import { useAddToDo } from "../lib/apiHooks";

export default function AddToDoItem(props) {
  const [toDoTitle, setToDoTitle] = useState("");
  const addToDo = useAddToDo();
  const titleRef = useRef(null);

  const handleAdd = () => {
    toDoTitle.trim() !== "" &&
      addToDo.mutate(toDoTitle, {
        onSuccess,
      });
  };

  const onSuccess = () => {
    setToDoTitle("");
  };

  const handleKeyDown = (e) => {
    // if user hits return key, create new todo item
    if (e.currentTarget.value.trim() !== "" && e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div>
      <span>
        <input
          ref={titleRef}
          type="text"
          onKeyDown={handleKeyDown}
          value={toDoTitle}
          onChange={(e) => setToDoTitle(e.currentTarget.value)}
          className="border"
        />
      </span>
      <button onClick={handleAdd} className="btn-primary">
        Add
      </button>
    </div>
  );
}
