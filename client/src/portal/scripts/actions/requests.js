import * as types from './../actions/_types';


export const markRequestStart = key => ({
  type: types.APP_REQUEST_START,
  meta: { key }
});

export const markRequestSuccess = key => ({
  type: types.APP_REQUEST_SUCCESS,
  meta: { key }
});

export const markRequestFailed = (key, error) => ({
  type: types.APP_REQUEST_FAILED,
  payload: { error },
  meta: { key }
});
