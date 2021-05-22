const thunk = (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    return await action(store.dispatch);
  } else {
    return next(action);
  }
};

export default thunk;
