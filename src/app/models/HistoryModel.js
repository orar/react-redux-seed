// @flow
import createHistory from 'history/createBrowserHistory';
import { createAction, handleActions } from 'redux-actions';


export const history = createHistory();

// location is an object like window.location. location.pathname, location.state
export const initialState = history.location;

export const locationChange = createAction('LOCATION_CHANGE', location => location || '/');
export const updateAppLocation = ({ dispatch }) => nextLocation => dispatch(locationChange(nextLocation));

export default handleActions({
  [locationChange]: (state, action) => action.payload,
}, initialState);
