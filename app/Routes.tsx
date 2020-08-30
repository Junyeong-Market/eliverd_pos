import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import CalcPage from './containers/CalcPage';
import JoinPage from './containers/JoinPage';
import CSPage from './containers/CreateStorePage';
import SSPage from './containers/SelectStorePage';
import WSRPage from './containers/W_searchRegisterer';
import CKSPage from './containers/CheckStorePage';
import PurCompPage from './containers/PurCompPage';
import StockManagePage from './containers/StockManagePage';
import OrderPage from './containers/OrderPage';
import SettingPage from './containers/SettingPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.CALCULATOR} component={CalcPage} />
        <Route path={routes.CKS} component={CKSPage} />
        <Route path={routes.ORDER} component={OrderPage} />
        <Route path={routes.SETTING} component={SettingPage} />
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.JOIN} component={JoinPage} />
        <Route path={routes.CREATESTORE} component={CSPage} />
        <Route path={routes.SELECTSTORE} component={SSPage} />
        <Route path={routes.PURCHASECOMPLETE} component={PurCompPage} />
        <Route path={routes.STOCKMANAGE} component={StockManagePage} />
        <Route path={routes.W_SR} component={WSRPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
