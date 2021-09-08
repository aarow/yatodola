import React, { useState, useRef } from "react";
import PlaylistAddTwoToneIcon from "@material-ui/icons/PlaylistAddTwoTone";

import { useAddToDo } from "../lib/apiHooks";

export default function AddToDoItem(props) {
  const [toDoTitle, setToDoTitle] = useState("");
  const addToDo = useAddToDo();
  const titleRef = useRef(null);

  const handleAdd = () => {
    if (toDoTitle.trim() === "") return;

    const newToDoTitle = toDoTitle;
    setToDoTitle("");

    addToDo.mutate(newToDoTitle, {
      onError: (newToDoTitle) => {
        setToDoTitle(newToDoTitle);
      },
    });
  };

  const handleKeyDown = (e) => {
    // if user hits return key, create new todo item
    if (e.currentTarget.value.trim() !== "" && e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex w-full	">
      <input
        ref={titleRef}
        type="text"
        onKeyDown={handleKeyDown}
        value={toDoTitle}
        onChange={(e) => setToDoTitle(e.currentTarget.value)}
        className="flex-grow border border-gray-300 rounded-tl rounded-bl py-5 px-5 focus:outline-none"
        placeholder="Add something to your list..."
      />

      <button
        onClick={handleAdd}
        className="flex-grow-0 flex-shrink-0 btn border border-gray-300 bg-gray-100 text-gray-400 hover:text-gray-600 rounded-tr rounded-br -ml-px"
      >
        <PlaylistAddTwoToneIcon />
      </button>
    </div>
  );
}
