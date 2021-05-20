import { createStore } from 'redux';
import todoReducer from './reducers/todo.r';

const todoItem = {
  id: '0',
  title: 'Buy chocolate',
  content: 'I want really to buy coffe right now 😂',
  completed: true,
  timestamp: new Date(),
  shelf: 'shelf1',
};

export const initialState = { todoItems: [todoItem] };

const createTempStore = () => {
  console.log('Creating Store');
  return createStore(todoReducer, initialState);
};

const store = createTempStore();
export default store;
