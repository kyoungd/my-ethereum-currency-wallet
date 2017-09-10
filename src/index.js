import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import logger from 'redux-logger';

import App from './App'
import reducers from './reducers';
import Transfer from './components/transfer';
import Allowance from './components/allowance';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(logger, reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="transfer" component={Transfer} ></Route>
        <Route path="allowance" component={Allowance} ></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
