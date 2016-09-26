import * as types from "./_types";


const getRequestKey = (id, type) => {
  return `widget/${type}/${id}`;
};

export const updateWidget = formData => ({
  type: types.API,
  payload: {
    url: 'widgets',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'update'),
    successAction: types.SET_WIDGETS,
    // errorAction: types.UPDATE_WIDGETS_FAIL
  }
});
