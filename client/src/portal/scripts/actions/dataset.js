import * as types from "./_types";
import { apiUpdate } from './../api/dataset';


export function updateDataset(formData = {}) {
  return (dispatch, getState) => {
    return apiUpdate(formData).then(
      (resp) => {
        return dispatch({
          type: types.UPDATE_DATASET_SUCCESS,
          payload: resp.data
        });
      },
      (error) => {
        return dispatch({
          type: types.UPDATE_DATASET_FAIL,
          error: error,
          payload: formData
        })
      }
    )
  }
}
