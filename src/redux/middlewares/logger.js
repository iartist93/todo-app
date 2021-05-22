const logger = (store) => (next) => (action) => {
  console.group(`logger ${action.type}`);
  console.log('current ', store.getState());
  console.log('action ', action);
  const result = next(action);
  console.log('new ', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
