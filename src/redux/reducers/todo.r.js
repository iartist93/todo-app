import {
  ADD_TODO,
  RECIEVE_TODOS,
  REMOVE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from '../actions/todo.a';
import { initialState } from '../store';

export default function reducer(state = initialState, action) {
  console.log('reducer ', action);

  switch (action.type) {
    case RECIEVE_TODOS:
      return [...state, ...action.todos];
    case ADD_TODO:
      return [...state, action.todo];
    case REMOVE_TODO: {
      const newTodos = state.filter((todo) => todo.id !== action.id);
      return newTodos;
    }
    case UPDATE_TODO: {
      return state.map((todo) => {
        return todo.id === action.id ? { ...todo, ...action.todo } : todo;
      });
    }
    case TOGGLE_TODO: {
      return state.map((todo) => {
        todo.completed =
          todo.id === action.id ? !todo.completed : todo.completed;
        return todo;
      });
    }
    default:
      return state;
  }
}
