import toString from 'lodash/toString';
import { spawn } from 'redux-saga/effects';
import warn from './warn';

/**
 * Refines list of sagas to filter
 * @param sagas
 * @returns {any[]}
 */
const refineSagas = (sagas: Array<Generator<*, *, *> | Array<*>>) => sagas.map((saga) => {
  if (typeof saga === 'function') {
    return [saga];
  }

  if (Array.isArray(saga) && typeof saga[0] === 'function') {
    return saga;
  }

  warn(`Unknown saga generator type: ${typeof saga} as ${toString(saga)}`);
  return null;
}).filter(Boolean);


/**
 * Combines multiple saga into a single context for parallel execution
 * @param sagas
 */
export const combineSagas = (sagas: Array<Generator<*, *, *> | Array<*>>) => {
  refineSagas(sagas).forEach(saga => spawn(...saga));
};
