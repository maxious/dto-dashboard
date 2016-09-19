import * as types from "./_types";
import { apiUpdate, apiCreate } from './../api/datapoint';


export function updateDatapoint(formData = {}) {
  return (dispatch, getState) => {
    return apiUpdate(formData).then(
      (resp) => {
        return dispatch({
          type: types.UPDATE_DATAPOINT_SUCCESS,
          payload: resp.data
        });
      },
      (error) => {
        return dispatch({
          type: types.UPDATE_DATAPOINT_FAIL,
          error: error,
          payload: formData
        })
      }
    )
  }
}

export function createDatapoint(formData = {}) {
  return (dispatch, getState) => {
    return apiCreate(formData).then(
      (resp) => {
        return dispatch({
          type: types.CREATE_DATAPOINT_SUCCESS,
          payload: resp.data
        });
      },
      (error) => {
        return dispatch({
          type: types.CREATE_DATAPOINT_FAIL,
          error: error,
          payload: formData
        })
      }
    )
  }
}
