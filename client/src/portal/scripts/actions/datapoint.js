import * as types from "./_types";
import { setToast } from './toast';


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
    successActions: [
      types.SET_DATAPOINTS,
      () => setToast(`Datapoint: ${formData.label} updated`)
    ],
    errorActions: [
      // types.UPDATE_DATAPOINTS_FAIL,
      () => setToast(`Couldn't update datapoint: ${formData.label}`, 'error')
    ]
  }
});

export const createDatapoint = formData => ({
  type: types.API,
  payload: {
    url: 'datapoints',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'create'),
    successActions: [
      types.PUSH_DATAPOINT,
      () => setToast(`Datapoint created`)
    ],
    errorActions: [
      // types.CREATE_DATAPOINT_FAIL,
      () => setToast(`Couldn't create datapoint`, 'error')
    ]
  }
});
