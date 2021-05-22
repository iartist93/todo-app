const thunk = (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    const result = await action()(store.dispatch);
  }
  next(action);
};

export default thunk;
