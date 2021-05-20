import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todo.a';
import { initialState } from '../store';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Add todo case
    case ADD_TODO:
      return {
        ...state,
        todoItems: [...state.todoItems, action.todo]
      };

    // Remove todo case
    case REMOVE_TODO:
      const newTodos = state.todoItems.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todoItems: newTodos
      };

    // Toggle todo case
    case TOGGLE_TODO:
      // copy all todo items
      let todos = [...state.todoItems];

      // loop and update the state of selected todo item
      todos = todos.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

      return {
        ...state,
        todoItems: todos
      };

    default:
      return state;
  }
}
