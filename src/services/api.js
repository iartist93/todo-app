export const TODO_ITEMS_KEY = 'TODO_ITEMS_KEY';

export const saveState = async (state) => {
  localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(state));
};

export const getState = async () => {
  let data = localStorage.getItem(TODO_ITEMS_KEY);
  //TODO:: Refactor this. Should be generic not just array
  return data ? JSON.parse(data) : [];
};

export const removeState = async () => {
  localStorage.removeItem(TODO_ITEMS_KEY);
};

export const addTodo = async (todo) => {
  const state = await getState();
  await saveState([...state, todo]);
};

export const updateTodo = async (id, todoUpdates) => {
  const state = await getState();
  const todo = state.find((item) => item.id === id);
  const newState = state.map((todo) => {
    return todo.id === id ? { ...todo, ...todoUpdates } : todo;
  });
  await saveState(newState);
};

export const removeTodo = async (id) => {
  const state = await getState();
  const newList = state.filter((todo) => todo.id !== id);
  await saveState(newList);
};
