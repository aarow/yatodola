import { createClient } from "graphqurl";
import { useQuery, gql } from "@apollo/client";

const client = createClient({
  endpoint: "https://to-do-2022.hasura.app/v1/graphql",
  headers: {
    Authorization:
      "3YmrPlLP4MICz9gpJEHz47gOigkjVPNZ6jHIi3oTgyZhCONGkNABvT7LoW5bsnqT",
  },
});

export const getToDoListQuery = () => {
  client
    .query({
      query: `query 
    { 
      ToDo {  
        id
        isDone
        title
      } 
    }`,
      variables: { id: 24 },
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};

let toDoList = [
  {
    id: 1,
    title: "foo",
    isDone: false,
  },
  {
    id: 2,
    title: "bar",
    isDone: false,
  },
  {
    id: 3,
    title: "pooh",
    isDone: false,
  },
  {
    id: 4,
    title: "bear",
    isDone: false,
  },
];

// mockup async wait time
function wait(timeInMS) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMS);
  });
}

export async function getToDoList() {
  await wait(300);
  return [...toDoList];
}

export async function addToDo(toDoTitle) {
  await wait(300);
  toDoList.push({
    title: toDoTitle,
    isDone: false,
  });
}

export async function toggleToDo(id) {
  await wait(300);
  toDoList = toDoList.map((toDoItem) => {
    if (toDoItem.id !== id) return toDoItem;
    return { ...toDoItem, isDone: !toDoItem.isDone };
  });
}

export async function removeToDo(id) {
  await wait(300);
  toDoList = toDoList.filter((toDoItem) => {
    return id !== toDoItem.id;
  });
}

export async function editToDo(toDoItem) {
  await wait(300);
  toDoList = toDoList.map((currentToDoItem) => {
    if (toDoItem.id !== currentToDoItem.id) return currentToDoItem;
    return toDoItem;
  });
}
