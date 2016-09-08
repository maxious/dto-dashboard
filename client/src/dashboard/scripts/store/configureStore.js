let window = window || global;
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLoggerMiddleware from 'redux-logger';

import rootReducer from './../reducers';


export default function configureStore(bootState, debug = __DEV__) {
  const middlewares = [
    thunkMiddleware
  ];

  if (debug) {
    // middlewares.push(createLoggerMiddleware());
  }

  return compose(applyMiddleware(...middlewares), debug && window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(
    rootReducer,
    bootState
  );
}
