import React from "react";
import { Transition } from "react-transition-group";

import { useGetToDoList } from "../lib/apiHooks";
import ToDoItem from "./ToDoItem";

export default function ToDoList(props) {
  const { data = [], isLoading } = useGetToDoList();

  return (
    <>
      <ul>
        {data.map((toDoItem) => (
          <li key={toDoItem.id} className="">
            <ToDoItem {...toDoItem} />
          </li>
        ))}
      </ul>
      <FakeItems isVisible={isLoading} />
    </>
  );
}

function FakeItems(props) {
  const { count = 3, isVisible } = props;
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: "none" },
  };
  let Items = [];

  for (let i = 0; i < count; i++) {
    Items.push(
      <li
        key={i}
        className="bg-gray-100 rounded border border-gray-300 mb-2 py-4 px-5 flex"
      >
        <span className="bg-gray-200 py-3 w-6 mr-3"></span>
        <span className="bg-gray-200 py-3 w-full"></span>
      </li>
    );
  }

  return (
    <Transition in={isVisible} timeout={500}>
      {(state) => (
        <div
          style={{
            transition: `opacity 400ms ease-in-out`,
            opacity: 1,
            ...transitionStyles[state],
          }}
        >
          <ul className="relative">
            <div className="absolute inset-0 flex justify-center items-center">
              Loading...
            </div>
            {Items}
          </ul>
        </div>
      )}
    </Transition>
  );
}
