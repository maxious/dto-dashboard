import * as types from './../actions/_types';
import initialState from './../store/initialState';


// todo - clean up like Stack when state gets larger than x
const requestsReducer = (state = initialState.requests, {type, meta, payload}) => {

  switch (type) {
    case types.APP_REQUEST_START:
      return {...state, [meta.key]: {status: 'pending', error: null}};
      break;
    case types.APP_REQUEST_SUCCESS:
      return {...state, [meta.key]: {status: 'success', error: null}};
      break;
    case types.APP_REQUEST_FAILED:
      return {...state, [meta.key]: {status: 'failure', error: payload.error}};
      break;
    default:
      return state;
  }
};

export default requestsReducer;


// Selectors

/**
 *
 * @param state
 * @param key
 * @returns Object - request object or empty object
 */
export const getRequest = (state, key) => state.filter(s => s.key === key) || {};


/**
 * Global indicator to know whether *any* request is pending
 * @param state
 * @param key
 * @returns Boolean
 */
export const areRequestsPending = (state) => {
  return Object.keys(state)
    .some((key) => state[key].status === 'pending');
};
