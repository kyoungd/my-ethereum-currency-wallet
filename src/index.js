import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import logger from 'redux-logger';

import App from './App'
import reducers from './reducers';
import Transfer from './components/transfer';
import SpendAllowance from './components/spendAllowance';
import BuySellMint from './components/buySellMint';
import BuySellPrice from './components/buySellPrice';
import { Account } from './components/account';
import Home from './components/home';

import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home}></IndexRoute>
        <Route path="transfer" component={Transfer} ></Route>
        <Route path="allowance" component={Transfer} ></Route>
        <Route path="spendAllowance" component={SpendAllowance} ></Route>
        <Route path="buy" component={BuySellMint} ></Route>
        <Route path="sell" component={BuySellMint} ></Route>
        <Route path="account" component={Account} ></Route>
        <Route path="account(:w3)" component={Account} ></Route>
        <Route path="buySell" component={BuySellPrice} ></Route>
        <Route path="mint" component={BuySellMint} ></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
