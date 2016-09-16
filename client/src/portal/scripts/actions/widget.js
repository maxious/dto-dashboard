import * as types from "./_types";
import { update } from './../api/widget';


export function updateWidget(formData = {}) {
  return (dispatch, getState) => {
    return apiUpdate(formData.id, formData).then(
      (resp) => {
        return dispatch({
          type: types.UPDATE_WIDGET_SUCCESS,
          payload: resp.data
        });
      },
      (error) => {
        return dispatch({
          type: types.UPDATE_WIDGET_FAIL,
          error: error,
          payload: formData
        })
      }
    )
  }
}
