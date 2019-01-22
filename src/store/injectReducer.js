import makeRootReducer from './reducers';

/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */

/**
 * Ejects a reducer from the root reducer module.
 * This can be useful in module shutdown in code splitting
 *
 * @param store Redux store
 * @param key Module ID or reducer key
 */
export const ejectReducer = (store, key) => {
  if (
    store.moduleReducers
    && store.moduleReducers.constructor == Object
    && Object.hasOwnProperty.call(store.moduleReducers, key)
  ) {
    delete store.moduleReducers[key];
    store.replaceReducer(makeRootReducer(store.moduleReducers));
  }
};

/**
 * Injects a reducer of a module on code-split into the root reducer of redux store.
 * Reducer can be removed by invoking return value
 *
 * @param store Redux store object
 * @param key Reducer key, module Id
 * @param reducer Module Reducer function
 * @returns {*}
 */
export default (store, { key, reducer }) => {
  if (!store.moduleReducers || store.moduleReducers.constructor != Object) {
    store.moduleReducers = {};
  }

  if (Object.hasOwnProperty.call(store.moduleReducers, key)) {
    return () => ejectReducer(store, key);
  }

  const s = store;
  s.moduleReducers[key] = reducer;
  s.replaceReducer(makeRootReducer(s.moduleReducers));

  return () => ejectReducer(store, key);
};
