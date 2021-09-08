import "./App.css";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import ToDoList from "./components/ToDoList";
import AddToDoItem from "./components/AddToDoItem";
import { CheckAll } from "./components/CheckAll";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-50 min-h-screen py-5">
          <div className="container mx-auto max-w-md">
            <h1 className="text-center text-3xl">To Do List</h1>
            <p className="text-center mb-5">Or list of whatever...</p>

            <div className="mb-5">
              <AddToDoItem />
            </div>
            <CheckAll />
            <ToDoList />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}
