import * as types from "./_types";
import { setToast } from './toast';


const getRequestKey = (id, type) => {
  return `dashboard/${type}/${id}`;
};

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
