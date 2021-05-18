/*

If you built the logic yourself, paste it here
Export at least createStore

*/
function createStore(reducer, todos = {}) {
  let state = todos;

  const store = {};
  const listeners = [];

  store.getState = () => state;

  store.subscribe = (lis) => {
    listeners.push(lis);

    return () => {
      listeners.filter((l) => l !== lis);
    };
  };

  store.dispatch = (action) => {};
}
