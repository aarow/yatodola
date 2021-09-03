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
