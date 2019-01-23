// @flow
import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RequestProvider } from 'questrar';
import { createStateProvider } from 'questrar/redux';
import { history } from './models/HistoryModel';
import { RedirectToNotFound, NotFoundRouter } from './components/NotFound';

type Props = {
  store: Object,
}

/**
* App root component
* @author Orar
* @date   12/19/18, 10:01 PM
*/
class App extends Component<Props> {
  props: Props;

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;
    const stateProvider = createStateProvider(store);

    return (
      <ReduxProvider store={store}>
        <RequestProvider stateProvider={stateProvider}>
          <Router history={history}>
            <NotFoundRouter>
              <Switch>
                <Route exact path="/" render={() => <div>Im coming for you, Future!</div>} />
                <Route path="/eln" render={() => <div>Hi, my name is Eln</div>} />
                <RedirectToNotFound />
              </Switch>
            </NotFoundRouter>
          </Router>
        </RequestProvider>
      </ReduxProvider>
    );
  }
}


export default App;
