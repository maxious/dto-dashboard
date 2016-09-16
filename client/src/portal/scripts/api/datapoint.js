import fetch from 'whatwg-fetch';
import { USE_FIXTURES } from './../config';


/**
 * @param id
 * @param data
 * @returns {Promise}
 */

export const apiUpdate = (id, data) => {
  if (USE_FIXTURES) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({data, status:'success'});  // success interface
        // reject();                           // failure interface
      }, 800);
    });
  } else {
    // todo - token etc
    return fetch(`/api/datapoints/${id}`, {
      method: 'POST',
      body: data
    }).then((response) => {
      // todo
    })
  }
};


export const apiCreate = (data) => {
  if (USE_FIXTURES) {
    if (!data.dataset_id) {
      data.dataset_id = 2;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({data, status:'success'});  // success interface
        // reject();                           // failure interface
      }, 800);
    });
  } else {
    // todo - token etc
    return fetch(`/api/datapoints`, {
      method: 'POST',
      body: data
    }).then((response) => {
      // todo
    })
  }
};
