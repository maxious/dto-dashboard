import * as types from "./_types";
import { setToast } from './toast';
import getRequestKeyHOC from './../utils/getRequestKey';

export const getRequestKey = getRequestKeyHOC('widget');


export const updateWidget = formData => ({
  type: types.API,
  payload: {
    url: `dashboards/${formData.dashboard_id}/widgets/${formData.id}`,
    method: 'PUT',
    data: formData,
    key: getRequestKey(formData.id, 'update'),
    successActions: [
      types.SET_WIDGETS,
      () => setToast(`Widget: ${formData.name} updated`)
    ],
    errorActions: [
      // types.UPDATE_WIDGETS_FAIL
      () => setToast(`Couldn't update widget: ${formData.name}`, 'error')
    ]
  }
});
