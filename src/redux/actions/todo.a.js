import * as API from '../../services/api';

//----------------------------------------------------
//constants

export const RECIEVE_TODOS = 'RECIEVE_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

//----------------------------------------------------
// action creators

export const recieveTodos = (todos) => {
  return {
    type: RECIEVE_TODOS,
    todos,
  };
};

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const updateTodo = (id, todo) => {
  return {
    type: UPDATE_TODO,
    id,
    todo,
  };
};

//----------------------------------------------------
// Thunks

export const handleRecieveTodos = () => {
  return async (dispatch) => {
    const todos = await API.getState();
    dispatch(recieveTodos(todos));
  };
};

export const handleAddTodo = (todo) => {
  return async (dispatch) => {
    console.log('dispatch ', dispatch);
    await API.addTodo(todo);
    dispatch(addTodo(todo));
  };
};

export const handleRemoveTodo = (id) => {
  return async (dispatch) => {
    await API.removeTodo(id);
    dispatch(removeTodo(id));
  };
};

//TODO:: Implement this
export const handleToggleTodo = (id) => {
  return async (dispatch) => {};
};

export const handleUpdateTodo = (id, todo) => {
  return async (dispatch) => {
    console.log('update dispatch ', dispatch);
    await API.updateTodo(id, todo);
    const result = dispatch(updateTodo(id, todo));
    console.log(result);
  };
};
