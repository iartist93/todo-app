import { drag } from './drag';
import store from './redux/store';
import {
  handleRecieveTodos,
  handleAddTodo,
  handleUpdateTodo,
  handleRemoveTodo,
  handleToggleTodo,
} from './redux/actions/todo.a';

//-----------------------------------------------------------//
// subscribe to state change

store.dispatch(handleRecieveTodos());
store.subscribe(() => onStateUpdate());

//-----------------------------------------------------------//
// document queries

const form = document.querySelector('.todo-form');
const todoShelves = document.querySelectorAll('.todo-list');
const todoTextInput = document.querySelector('.todo-input-title');
const todoTextContent = document.querySelector('.todo-input-content');
const todoCompletedInput = document.querySelector('#input-completed-checkbox');
const modalContainer = document.querySelector('.modal-container');
const addNewButton = document.querySelector('#add-new-btn');

//-----------------------------------------------------------//
// add todo modal events

addNewButton.onclick = (event) => {
  modalContainer.style.display = 'flex';
};

window.onclick = (event) => {
  if (event.target === modalContainer) {
    modalContainer.style.display = 'none';
  }
};

//-----------------------------------------------------------//
// add new todo handler

form.onsubmit = (e) => {
  e.preventDefault();

  // Build a new todo object, don't forget to append an ID
  const newTodo = {
    id: new Date().getTime().toString(),
    title: todoTextInput.value,
    content: todoTextContent.value,
    completed: todoCompletedInput.checked,
    timestamp: new Date(),
    shelf: 'shelf1',
  };

  // Dispatch an action to add a new todo
  store.dispatch(handleAddTodo(newTodo));
  todoTextInput.value = '';
  todoTextContent.value = '';
};

//-----------------------------------------------------------//
// state change listener

const onStateUpdate = () => {
  // Get updated state with getState
  const todoItems = store.getState();

  // clear the current UI list
  todoShelves.forEach((shelf) => (shelf.innerHTML = ''));

  todoItems
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((todoItem) => {
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
      todoContainer.id = todoItem.id;
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
        store.dispatch(handleToggleTodo(todoItem.id));
      };

      // delete button
      todoDelete.className = 'todo-delete';
      todoDelete.textContent = '✖';
      todoDelete.onclick = () => {
        store.dispatch(handleRemoveTodo(todoItem.id));
      };

      // UI builder
      todoActions.append(todoCheckbox, todoDelete);
      todoHeader.append(todoTitle, todoActions);
      todoContainer.append(todoHeader, todoContent);

      todoShelves.forEach((shelf) => {
        if (shelf.id === todoItem.shelf) {
          shelf.appendChild(todoContainer);
        }
      });
    });
};

//-----------------------------------------------------------//

// Temp reference

/*
const state = [
  {
    id: 0,
    text: 'todo 1',
    completed: false,
  },
  {
    id: 1,
    text: 'todo 2',
    completed: false,
  },
  {
    id: 2,
    text: 'todo 3',
    completed: false,
  },
];

*/

//-----------------------------------------------------------//
// execute for the first time

onStateUpdate();

//-----------------------------------------------------------//
