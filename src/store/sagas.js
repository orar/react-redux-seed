// @flow
import { all } from 'redux-saga/effects';
import { combineSagas } from '../util/SagaUtil';

/**
 * Combines all sagas into an array which are executed in parallel
 *
 * @returns {IterableIterator<*>}
 */
export default function* rootSagas(): Generator<*, *, *> {
  yield all(combineSagas([
    // Add your generic sagas here

  ]));
}
