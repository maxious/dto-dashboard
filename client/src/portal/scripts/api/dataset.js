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
    return fetch(`/api/datasets/${id}`, {
      method: 'POST',
      body: data
    }).then((response) => {
      // todo
    })
  }
};

