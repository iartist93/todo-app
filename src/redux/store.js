import { createStore } from './redux';
import todoReducer from './reducers/todo.r';
import middlewares from './middlewares/index';

const todoItem = {
  id: '0',
  title: 'Buy chocolate',
  content: 'I want really to buy coffe right now 😂',
  completed: true,
  timestamp: new Date().getTime(),
  shelf: 'shelf1',
};

// export const initialState = [todoItem];
export const initialState = [];

const store = createStore(todoReducer, initialState, middlewares);
export default store;
