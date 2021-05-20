// import { createStore, combineReducers } from "./MyRedux";
import { createStore } from 'redux';
import { drag, allowDrop, drop } from './drag';

//-----------------------------------------------------------//
// Actions

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const todoItem = {
  id: '0',
  title: 'Buy chocolate',
  content: 'I want really to buy coffe right now 😂',
  completed: true
};

/* Reducer */
const initialState = { todoItems: [todoItem] };

// action creators
const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo
  };
};

const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id
  };
};

const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  };
};

//-----------------------------------------------------------//
// Reducers

function reducer(state = initialState, action) {
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

//-----------------------------------------------------------//
// Store

const { getState, dispatch, subscribe } = createStore(reducer, initialState);

// add listener to changes in state
subscribe(() => onStateUpdate());

//-----------------------------------------------------------//
// UI quries

const form = document.querySelector('.todo-form');
const todoListElement = document.querySelector('.todo-list');
const todoTextInput = document.querySelector('.todo-input-title');
const todoTextContent = document.querySelector('.todo-input-content');
const todoCompletedInput = document.querySelector('#input-completed-checkbox');

const modalContainer = document.querySelector('.modal-container');
const addNewButton = document.querySelector('#add-new-btn');

//-----------------------------------------------------------//
// Modal Events

addNewButton.onclick = (event) => {
  modalContainer.style.display = 'flex';
};

window.onclick = (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = 'none';
  }
};

//-----------------------------------------------------------//
// UI events

// global track of the current id
// TODO: Generate random id
let currentId = 1;

form.onsubmit = (e) => {
  e.preventDefault();

  // Build a new todo object, don't forget to append an ID
  const newTodo = {
    id: currentId++,
    title: todoTextInput.value,
    content: todoTextContent.value,
    completed: todoCompletedInput.checked
  };

  // Dispatch an action to add a new todo
  dispatch(addTodo(newTodo));
  todoTextInput.value = '';
  todoTextContent.value = '';
};

//-----------------------------------------------------------//
// UI builder

const onStateUpdate = () => {
  // Get updated state with getState
  const { todoItems } = getState();

  // clear the current UI list
  todoListElement.innerHTML = '';

  todoItems.forEach((todoItem) => {
    // const todoListItem = document.createElement("li");
    const todoContainer = document.createElement('div');
    const todoHeader = document.createElement('div');
    const todoActions = document.createElement('div');
    const todoCheckbox = document.createElement('input');
    const todoTitle = document.createElement('p');
    const todoContent = document.createElement('p');
    const todoDelete = document.createElement('button');

    // container
    todoContainer.className = 'todo drag-item';
    todoContainer.id = `todo-${todoItem.id}`;
    todoContainer.draggable = true;
    todoContainer.ondragstart = (event) => drag(event);

    // header
    todoHeader.className = 'todo-header';

    // actions
    todoActions.className = 'todo-actions';

    // title
    todoTitle.innerHTML = todoItem.title;
    todoTitle.className = 'todo-title';

    // content
    todoContent.innerHTML = todoItem.content;
    todoContent.className = 'todo-content';

    // checkbox completed
    todoCheckbox.className = 'todo-checkbox';
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todoItem.completed;
    todoCheckbox.onchange = () => {
      dispatch(toggleTodo(todoItem.id));
    };

    // button delete
    todoDelete.className = 'todo-delete';
    todoDelete.textContent = '✖';
    todoDelete.onclick = () => {
      dispatch(removeTodo(todoItem.id));
    };

    // builder
    todoActions.append(todoCheckbox, todoDelete);
    todoHeader.append(todoTitle, todoActions);
    todoContainer.append(todoHeader, todoContent);
    todoListElement.appendChild(todoContainer);
  });
};

//-----------------------------------------------------------//

// Temp reference

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
//-----------------------------------------------------------//
onStateUpdate();

//-----------------------------------------------------------//
export { drag, allowDrop, drop };
