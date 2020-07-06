import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import NewPage from './containers/NewPage';
import CalcPage from './containers/CalcPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.NEW} component={NewPage} />
        <Route path={routes.CALCULATOR} component={CalcPage} />
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
