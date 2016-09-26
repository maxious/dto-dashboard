import * as types from "./_types";


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
      successAction: types.SET_DASHBOARDS,
      // errorAction: types.UPDATE_DASHBOARDS_FAIL
    }
  }
};
