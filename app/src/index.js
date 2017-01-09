import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {Router,browserHistory} from 'react-router';

import ReduxPromise from 'redux-promise'

import reducers from './reducers';
import routes from './routes'

//css
import { flexboxgrid } from 'flexboxgrid';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes ={routes}/>
  </Provider>
  , document.getElementById('app'));
