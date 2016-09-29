import * as types from "./_types";
import { setToast } from './toast';
import getRequestKeyHOC from './../utils/getRequestKey';

export const getRequestKey = getRequestKeyHOC('datapoint');


export const updateDatapoint = formData => ({
  type: types.API,
  payload: {
    url: `datasets/${formData.dataset_id}/datapoints/${formData.id}`,
    method: 'PUT',
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
    url: `datasets/${formData.dataset_id}/datapoints`,
    method: 'POST',
    data: formData,
    key: getRequestKey(null, 'create'),
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
