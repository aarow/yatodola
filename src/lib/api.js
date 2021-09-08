import axios from "axios";
import { createClient } from "graphqurl";

const client = createClient({
  endpoint: "https://to-do-2022.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "3YmrPlLP4MICz9gpJEHz47gOigkjVPNZ6jHIi3oTgyZhCONGkNABvT7LoW5bsnqT",
  },
});

export const getToDoList = () => {
  return axios
    .get(`/.netlify/functions/todo`)
    .then(({ data }) => data)
    .catch((error) =>
      console.error("error  src/lib/api.js/getToDoListQuery()", error)
    );

  // return client
  //   .query({
  //     query: `query
  //     {
  //       ToDo(where: {active: {_eq: true}}, order_by: {created_at: desc}) {
  //         id
  //         isDone
  //         title
  //         created_at,
  //         guid
  //       }
  //     }`,
  //   })
  //   .then((response) => {
  //     // console.log(response.data.ToDo);
  //     return response.data.ToDo;
  //   })
  //   .catch((error) =>
  //     console.error("error  src/lib/api.js/getToDoListQuery()", error)
  //   );
};

export const getToDoListOrder = () => {
  return client
    .query({
      query: `query GetToDoListOrder {
        User {
          to_do_items
        }
      }`,
    })
    .then((response) => {
      return response.data.User[0].to_do_items;
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/getToDoListOrder()", error)
    );
};

export async function addToDo(toDoTitle) {
  return client
    .query({
      query: `mutation AddToDo($title: String!) {
        insert_ToDo_one(object: {title: $title}) {
          id
          isDone
          title
        }
      }`,
      variables: { title: toDoTitle },
    })
    .catch((error) => console.error("error  src/lib/api.js/addToDo()", error));
}

export async function toggleToDo(id) {
  console.log(id);
  return client
    .query({
      query: `mutation ToggleToDo($id: Int!, $isDone: Boolean = false) {
        update_ToDo_by_pk(pk_columns: {id: $id}, _set: {isDone: $isDone}) {
          isDone
          id
          title
        }
      }`,
      variables: { id: id },
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/toggleToDo()", error)
    );
}

export async function removeToDo(id) {
  return client
    .query({
      query: `mutation ToggleToDo($id: Int!) {
        update_ToDo_by_pk(pk_columns: {id: $id}, _set: {active: false}) {
          isDone
          id
          title
        }
      }`,
      variables: { id: id },
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/removeToDo()", error)
    );
}

export async function editToDo(toDoItem) {
  return client
    .query({
      query: `mutation ToggleToDo(
          $id: Int!, 
          $isDone: Boolean,
          $title: String!
        ) {
        update_ToDo_by_pk(pk_columns: {id: $id}, _set: {
          isDone: $isDone,
          title: $title
        }) {
          isDone
          id
          title
        }
      }`,
      variables: {
        id: toDoItem.id,
        isDone: toDoItem.isDone,
        title: toDoItem.title,
      },
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/toggleToDo()", error)
    );
}

export async function reorderToDoList(toDoListOrderArray) {
  return client
    .query({
      query: `mutation UpdateToDoOrder($id: uuid = "", $to_do_items: jsonb = "") {
        update_User_by_pk(pk_columns: {id: $id}, _set: {to_do_items: $to_do_items}) {
          id
          to_do_items
        }
      }`,
      variables: {
        id: "d7afff96-b70d-4b91-b173-c53f3205ba4d",
        to_do_items: toDoListOrderArray,
      },
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/toggleToDo()", error)
    );
}

export async function checkAll(toDoItem) {
  return client
    .query({
      query: `mutation ToggleToDo(
          $id: Int!, 
          $isDone: Boolean,
          $title: String!
        ) {
        update_ToDo_by_pk(pk_columns: {id: $id}, _set: {
          isDone: $isDone,
          title: $title
        }) {
          isDone
          id
          title
        }
      }`,
      variables: {
        id: toDoItem.id,
        isDone: toDoItem.isDone,
        title: toDoItem.title,
      },
    })
    .catch((error) =>
      console.error("error  src/lib/api.js/toggleToDo()", error)
    );
}
