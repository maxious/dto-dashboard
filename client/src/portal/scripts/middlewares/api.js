import { v1 as makeUuid } from 'uuid';

import * as types from './../actions/_types';
import {
  markRequestStart,
  markRequestSuccess,
  markRequestFailed,
} from './../actions/requests';


/**
 * @type {ReduxMiddleware}
 * @returns result - next(action) - pipe the action to the next middleware,
 * using dispatch instead will pass the action back to the start of the
 * middleware chain
 */
const apiMiddleware = ({dispatch, getState}) => next => action => {

  const state = getState();
  let { config, currentUser: {SESSION_TOKEN}} = state;


  // if not an API call, do not decorate with middleware
  if (action.type !== types.API) {
    return next(action);
  }

  const { payload: { method, url, successActions, errorActions, data, key } } = action;


  dispatch(markRequestStart(key));

  if (config.USE_FIXTURES) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!data.id) {
          data.id = makeUuid();
        }
        resolve({status:200, data});  // success interface
        // reject({status:301, statusText: 'Server error', error:new Error()});  // failure interface
      }, 2000)
    }).then(
        resp => {
          let { status, statusText } = resp;
          if (status >= 200 && status < 300) {
            successActions.forEach((action) => {
              if (typeof action === "function") {
                return dispatch(action());
              }
              return next({
                type: action,
                payload: resp.data
              });
            });
            dispatch(markRequestSuccess(key));
            return resp.data;
          }
          throw new Error({message:statusText});
        },
        e => {
          throw new Error(e);
        }
      )
      .catch(e => {
        errorActions.forEach((action) => {
          if (typeof action === "function") {
            return dispatch(action());
          }
          return next({
            type: action,
            payload: e,
            error: true,
            meta: {
              data
            }
          });
        });
        dispatch(markRequestFailed(key, e));
      });

  } else {

    return fetch(`${config.API_BASE_URL}${url}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${SESSION_TOKEN}`
      }
    })
      .then(resp => {
        if (status >= 200 && status < 300) {
          throw new Error(resp.status);
        }
        return resp.json()
      })
      .then(
        data => {
          successActions.forEach((action) => {
            if (typeof action === "function") {
              // debugger
              return dispatch(action());
            }
            // debugger
            return next({
              type: action,
              payload: data
            });
          });
          dispatch(markRequestSuccess(key));
          return data;
        },
        error => {
          // debugger;
          throw new Error(error);
        }
      ).catch(e => {
        // debugger;

        errorActions.forEach((action) => {
          if (typeof action === "function") {
            return dispatch(action());
          }
          return next({
            type: action,
            payload: e,
            error: true,
            meta: {
              error: data
            }
          });
        });
        dispatch(markRequestFailed(key, e));
      })
  }
};

export default apiMiddleware;
