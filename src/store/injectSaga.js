import { sagaMiddleware } from './middlewares';
import noop from '../util/noop';

/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */

/**
 * Cancels/returns a saga. A cancelled saga is synonymous to ejected saga.
 * Ejects a module saga from store started by the saga middleware separately
 *
 * @param store Redux store
 * @param key Module id
 * @param task Saga task
 */
const ejectSaga = (store, key, task) => {
  if (
    store.moduleSagas
    && store.moduleSagas.constructor == Object
    && Object.hasOwnProperty.call(store.moduleSagas, key)
    && task.isRunning()
  ) {
    task.cancel();
    delete store.moduleSagas[key];
  }
};


/**
 * Injects and runs a module saga.
 * This is useful for code splitting purposes
 *
 * @param store Redux store
 * @param key Module id
 * @param saga Saga task
 * @returns {*}
 */
export default (store, { key, saga }) => {
  if (!store.moduleSagas || store.moduleSagas.constructor != Object) {
    store.moduleSagas = {};
  }

  if (Object.hasOwnProperty.call(store.moduleSagas, key)) return noop;

  const s = store;
  s.moduleSagas[key] = saga;
  const task = sagaMiddleware.run(s.moduleSagas[key]);

  return () => ejectSaga(store, key, task);
};
