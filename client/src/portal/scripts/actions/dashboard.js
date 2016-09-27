import * as types from "./_types";
import { setToast } from './toast';
import getRequestKeyHOC from './../utils/getRequestKey';

export const getRequestKey = getRequestKeyHOC('dashboard');


export const updateDashboard = formData => {
  return {
    type: types.API,
    payload: {
      url: 'dashboards',
      method: 'POST',
      data: formData,
      key: getRequestKey(formData.id, 'update'),
      successActions: [
        types.SET_DASHBOARDS,
        () => setToast(`Dashboard: ${formData.name} updated`)
      ],
      errorActions: [
        // types.UPDATE_DASHBOARDS_FAIL,
        () => setToast(`Couldn't update dashboard: ${formData.name}`, 'error')
      ]
    }
  }
};
