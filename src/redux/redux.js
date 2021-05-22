/**
 * Create new store object.
 * @param {*} reducer  Root reducer. use `combineReducer()` if you have muliple reducers.
 * @param {*} predefinedState  Inital store state.
 * @param {*} enhancer  Custom function that applies to the `createStore()` and modify its functionality.
 * @returns store object
 */
export const createStore = (reducer, predefinedState, enhancer) => {
  if (enhancer && typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, predefinedState);
  }

  let state = predefinedState;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

//--------------------------------------------------------------//

/**
 * Combine multiple reducers in one root reducers. Which will pass each reducers its slice of the state.
 * @param {*} reducers Is object combine all reducers
 * @returns Root reducer.
 */
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    Object.entries(reducers).forEach(([slice, reducer]) =>
      Object.assign(newState, { [slice]: reducer(state[slice], action) })
    );
    return newState;
  };
};

//--------------------------------------------------------------//

/**
 * Compose multiple functions so that the output of each one is the input to the next.
 * @param  {...function} funcs  the functions to compose
 * @returns composed functions like `f(g(x))`
 *
 * Example
 *
 * ```
  const add5 = (a) => a + 5;
  const mult10 = (a) => a * 10;

  const composed = compose(add5, mult10);
  console.log(composed(4)); // => 45
```
  *
 */

export const compose = (...funcs) => {
  if (funcs.length === 0) return (args) => args;
  if (funcs.length === 1) return funcs[0];

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);

  return (...args) => rest.reduceRight((acc, next) => next(acc), last(...args));
};

//--------------------------------------------------------------//

/**
 * Is an `enhancer` that modifies `dispatch()`
 * and apply the passed middlwares before calling the original dispatch.
 * 
 * **Middleware Example**
 * ```js
  const logger = (store) => (next) => (action) => {
    console.log(store.getState());
    console.log(action.type);
    dispatch(action);
  }
```
 * @param  {...any} middlewares
 * @returns new modified `createStore()` function
 */

export const applyMiddlewares = (...middlewares) => {
  // remember the middlewares
  return (createStore) => (reducer, enhancer) => {
    const store = createStore(reducer, enhancer);

    const newStore = {
      getState: store.getState,
      dispatch: (action) => store.dispatch(action),
    };

    // pass the first argument to the middlewares `store`
    const chain = middlewares.map((middleware) => middleware(newStore));

    // apply all the middlwares
    // `composte(...middlewares)` will return `(next) => (action) => dispatch(action)`
    // we need to return the last function only to the new dispatch `(action) => dispatch(action)`
    // so we pass the original `store.dispatch` as argument the composed functions

    // here the last middlware will take `store.dispatch` as `next`
    // and then the returned result will passed to the pre-last one
    // and so one

    // when we call new_dispatch(action)
    // those middlwares will be executed from left to right
    dispatch = compose(...chain)(store.dispatch);

    // return the new store with altered dispatch
    return {
      ...store,
      dispatch,
    };
  };
};
