import * as types from "./_types";
import { apiUpdate } from './../api/dashboard';


export function updateDashboard(formData = {}) {
  return (dispatch, getState) => {
    return apiUpdate(formData.id, formData).then(
      (resp) => {
        return dispatch({
          type: types.UPDATE_DASHBOARD_SUCCESS,
          payload: resp.data
        });
      },
      (error) => {
        return dispatch({
          type: types.UPDATE_DASHBOARD_FAIL,
          error: error,
          payload: formData
        })
      }
    )
  }
}
