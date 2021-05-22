const logger = (store) => (next) => (action) => {
  console.log('logger:state ', store.getState());
  console.log('logger:action ', action);
  return next(action);
};

export default logger;
