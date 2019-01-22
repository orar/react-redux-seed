// @flow
import 'regenerator-runtime/runtime';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './app/App';
import createStore from './store/createStore';
import './styles/core.scss';

// Application mount element id
const APP_MOUNT_ID = 'app';

// Application mount container
const appMountNode = document.getElementById(APP_MOUNT_ID);

const store = createStore();

/**
 * Renders application tree
 * @returns {*}
 */
const renderApp = () => {
  return render(
    <AppContainer warnings={false}>
      <App store={store} />
    </AppContainer>,
    appMountNode,
  );
};

/**
 * Application runner
 */
let run = renderApp;


if (process.env.NODE_ENV === 'development') {
  /* eslint-disable-next-line */
  const Redbox = require('redbox-react').default;

  /**
   * Renders application errors thrown in development
   * @param error
   * @returns {*}
   */
  const renderError = (error: Error) => {
    return render(
      <Redbox error={error} />,
      appMountNode,
    );
  };

  run = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
}

// Run application at last!
run();
