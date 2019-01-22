import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

export const sagaMiddleware = createSagaMiddleware();

// Too many middlewares can slow store updates
export default [
  sagaMiddleware,
  promiseMiddleware,
  // thunk,
];
