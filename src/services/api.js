export const TODO_ITEMS_KEY = 'TODO_ITEMS_KEY';

export const saveState = async (state) => {
  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(state));
};

export const getState = async () => {
  const data = localStorage.getItem(TODO_ITEMS_KEY);
  return JSON.parse(data);
};

export const removeState = async () => {
  localStorage.removeItem(TODO_ITEMS_KEY);
};

export const addTodo = async (todo) => {
  const state = await getState();
  console.log(state);
  const todoItems = state.todoItems;
  const newList = [...todoItems, todo];
  state.todoItems = newList;
  await saveState(state);
  console.log(state);
};

export const updateTodo = async (id, todoUpdates) => {
  const state = await getState();
  console.log(state);
  const todoItems = state.todoItems;
  const todo = todoItems.find((item) => item.id === id);
  todoItems[id] = [...todo, ...todoUpdates];
  state.todoItems = todoItems;
  await saveState(state);
  console.log(state);
};

export const removeTodo = async (id) => {
  const state = await getState();
  console.log(state);
  const todoItems = state.todoItems;
  const newList = todoItems.filter((todo) => todo.id !== id);
  state.todoItems = newList;
  await saveState(newList);
  console.log(state);
};

/*
const state = {
  todoItems: [
    {
      id: 0,
      text: 'todo 1',
      completed: false
    },
    {
      id: 1,
      text: 'todo 2',
      completed: false
    },
    {
      id: 2,
      text: 'todo 3',
      completed: false
    }
  ]
};

*/
