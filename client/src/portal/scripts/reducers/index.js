import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import app from './app';
import config from './config';
import requests from './requests';
import ui from './ui';
import currentUser from './currentUser';
import dashboards from './dashboards';
import widgets from './widgets';
import datasets from './datasets';
import datapoints from './datapoints';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  routing: routerReducer,
  app,
  config,
  requests,
  ui,
  form: formReducer,
  currentUser,
  dashboards,
  widgets,
  datasets,
  datapoints
});

export default rootReducer;
