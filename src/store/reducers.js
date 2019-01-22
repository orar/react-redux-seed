import { combineReducers } from 'redux';
import { requestStateReducer } from 'questrar/redux';

/**
 * Creates a single app-wide Redux reducer.
 * @param moduleReducers Reducers of app modules injected individually usually on code split
 * @returns {Reducer<any> | Reducer<any, AnyAction>}
 */
export default function makeRootReducer(moduleReducers = {}) {
  return combineReducers({
    // Add your top level reducers here

    ...moduleReducers,
    ...requestStateReducer,
  });
}
