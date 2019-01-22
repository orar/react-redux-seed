import { createStore, compose, applyMiddleware } from 'redux';
import createReducers from './reducers';
import rootSaga from './sagas';
import middlewares, { sagaMiddleware } from './middlewares';
import { updateAppLocation, history } from '../app/models/HistoryModel';

export default (preloadedState = {}) => {
  let composers = compose;

  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable-next-line no-underscore-dangle */
    const devToolExtensionComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof devToolExtensionComposer === 'function') {
      composers = devToolExtensionComposer;
    }
  }

  const reducers = createReducers();

  const store = createStore(
    reducers,
    preloadedState,
    composers(
      applyMiddleware(...middlewares),
    ),
  );

  sagaMiddleware.run(rootSaga);

  store.unsubscribeHistory = history.listen(updateAppLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const rootReducers = require('./reducers').default;
      store.replaceReducer(rootReducers(store.moduleReducers));
    });
  }

  return store;
};
