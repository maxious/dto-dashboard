require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { merge } from 'lodash';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import initialState from './store/initialState';
import initialConfig from './store/initialConfig';
import Root from './containers/root';


const config = merge(initialConfig, window.__CONFIG__);
const bootState = merge(initialState, window.__STATE__, {config});
const store = configureStore(bootState, hashHistory);

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('portal_index')
);
