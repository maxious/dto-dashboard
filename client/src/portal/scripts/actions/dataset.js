import * as types from "./_types";


const getRequestKey = (id, type) => {
  return `dataset/${type}/${id}`;
};

export const updateDataset = formData => ({
  type: types.API,
  payload: {
    url: 'datasets',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'update'),
    successAction: types.SET_DATASETS,
    errorAction: types.UPDATE_DATASETS_FAIL
  }
});
