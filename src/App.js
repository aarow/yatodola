import "./App.css";
import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import ToDoList from "./components/ToDoList";
import AddToDoItem from "./components/AddToDoItem";

const queryClient = new QueryClient();
const engine = new Styletron();

export default function App() {
  return (
    <>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
              <AddToDoItem />
              <ToDoList />
            </BaseProvider>
          </StyletronProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </React.StrictMode>
    </>
  );
}
