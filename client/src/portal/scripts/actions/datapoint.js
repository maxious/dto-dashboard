import * as types from "./_types";


const getRequestKey = (id, type) => {
  return `datapoint/${type}/${id}`;
};

export const updateDatapoint = formData => ({
  type: types.API,
  payload: {
    url: 'datapoints',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'update'),
    successAction: types.SET_DASHBOARDS,
    // errorAction: types.UPDATE_DATAPOINTS_FAIL
  }
});

export const createDatapoint = formData => ({
  type: types.API,
  payload: {
    url: 'datapoints',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'create'),
    successAction: types.PUSH_DATAPOINT,
    // errorAction: types.CREATE_DATAPOINT_FAIL
  }
});
