import * as types from './_types';


export function createWidgets(payload = []) {
  return {
    type: types.CREATE_WIDGETS,
    payload,
    meta: {}
  }
}
