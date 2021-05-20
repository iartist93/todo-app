import { createStore } from 'redux';
import todoReducer from './reducers/todo.r';

const todoItem = {
  id: '0',
  title: 'Buy chocolate',
  content: 'I want really to buy coffe right now 😂',
  completed: true,
  timestamp: new Date()
};

export const initialState = { todoItems: [todoItem] };

const store = createStore(todoReducer, initialState);
export default store;
