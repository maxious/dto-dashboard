import * as types from "./_types";

export const getRequestId = (id) => {
  return `dashboard/update/${id}`;
};


export const updateDashboard = formData => {
  return {
    type: types.API,
    payload: {
      url: 'dashboards',
      method: 'POST',
      data: formData,
      key: getRequestId(formData.id),
      successAction: types.SET_DASHBOARDS
    }
  }
};
