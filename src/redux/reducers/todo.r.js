import {
  ADD_TODO,
  RECIEVE_TODOS,
  REMOVE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from '../actions/todo.a';
import { initialState } from '../store';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVE_TODOS:
      return {
        ...state,
        ...action.todos,
      };
    case ADD_TODO:
      return {
        ...state,
        todoItems: [...state.todoItems, action.todo],
      };
    case REMOVE_TODO: {
      const newTodos = state.todoItems.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todoItems: newTodos,
      };
    }
    case UPDATE_TODO: {
      let todos = [...state.todoItems];
      todos = todos.map((todo) => {
        if (todo.id === action.id) {
          todo = action.todo;
        }
        return todo;
      });
      return {
        ...state,
        todoItems: todos,
      };
    }
    case TOGGLE_TODO: {
      let todos = [...state.todoItems];
      todos = todos.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

      return {
        ...state,
        todoItems: todos,
      };
    }

    default:
      return state;
  }
}
