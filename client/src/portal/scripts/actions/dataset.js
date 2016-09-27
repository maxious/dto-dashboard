import * as types from "./_types";
import { setToast } from './toast';
import getRequestKeyHOC from './../utils/getRequestKey';

export const getRequestKey = getRequestKeyHOC('dataset');


export const updateDataset = formData => ({
  type: types.API,
  payload: {
    url: 'datasets',
    method: 'POST',
    data: formData,
    key: getRequestKey(formData.id, 'update'),
    successActions: [
      types.SET_DATASETS,
      () => setToast(`Dataset: ${formData.name} updated`)
    ],
    errorActions: [
      // types.UPDATE_DATASETS_FAIL,
      () => setToast(`Couldn't update dataset: ${formData.name}`, 'error')
    ]
  }
});
