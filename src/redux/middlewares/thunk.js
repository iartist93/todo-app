const thunk = (store) => (next) => async (action) => {
  console.log('Thunk ==> ', action, action.type);
  if (typeof action === 'function') {
    const result = await action(store.dispatch);
    return;
  }
  next(action);
};

export default thunk;
