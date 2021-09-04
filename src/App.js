import "./App.css";
import { useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddToDoItem from "./components/AddToDoItem";

import { getToDoListQuery } from "./lib/api";

function App() {
  useEffect(() => {
    getToDoListQuery();
  }, []);

  return (
    <>
      <AddToDoItem />
      <ToDoList />
    </>
  );
}

export default App;
