const logger = (store) => (next) => (action) => {
  console.log('logger:state ', store.getState());
  console.log('logger:action ', action);
  next(action);
};

export default logger;
