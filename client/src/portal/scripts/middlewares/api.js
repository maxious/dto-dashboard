import fetch from 'whatwg-fetch';
import { v1 as makeUuid } from 'uuid';

import * as types from './../actions/_types';
import {
  markRequestStart,
  markRequestSuccess,
  markRequestFailed,
} from './../actions/requests';
import {
  USE_FIXTURES,
  API_BASE_URL
} from './../config';



/**
 * @type {ReduxMiddleware}
 * @returns result - next(action) - pipe the action to the next middleware,
 * using dispatch instead will pass the action back to the start of the
 * middleware chain
 */
const apiMiddleware = ({dispatch, getState}) => next => action => {

  // if not an API call, do not decorate with middleware
  if (action.type !== types.API) {
    return next(action);
  }

  const { payload: { method, url, successActions, errorActions, data, key } } = action;


  dispatch(markRequestStart(key));

  if (USE_FIXTURES) {
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
  }

  // todo
  // return fetch(`${API_BASE_URL}${url}`, {
  //   method,
  //   // body, credentials,
  //   // headers: {
  //   //   'Accept': 'application/json',
  //   //   'Content-Type': 'application/json',
  //   //   'Authorization': `Token ${data.token}`
  //   // }
  // })
  //   .then(response => {
  //     if (response.status >= 300) {
  //       throw new Error(response.status);
  //     } else {
  //       response.json()
  //     }
  //   })
  //   .then(apiEnd)
  //   .then(d => next({
  //     type: successAction,
  //     payload: d
  //   }))
  //   .catch(e => next({
  //     type: errorAction,
  //     payload: e,
  //     error: true,
  //     meta: {
  //       data
  //     }
  //   }));
};

export default apiMiddleware;
