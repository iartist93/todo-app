const logger = (store) => (dispatch) => (action) => {
  console.log('logger:state ', store.getState());
  console.log('logger:action ', action);
  dispatch(action);
};

export default logger;
