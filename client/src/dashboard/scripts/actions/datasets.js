import * as types from './_types';


export function createDatasets(payload = []) {
  return {
    type: types.CREATE_DATASETS,
    payload,
    meta: {}
  }
}
