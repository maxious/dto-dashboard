import fetch from 'whatwg-fetch';
import { USE_FIXTURES } from './../config';

let uuid = 100000;


/**
 * @param id
 * @param data
 * @returns {Promise}
 */

export const apiUpdate = (data) => {
  if (USE_FIXTURES) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({data, status:'success'});  // success interface
        // reject();                           // failure interface
      }, 800);
    });
  } else {
    // todo - token etc
    return fetch(`/api/datapoints/${data.id}`, {
      method: 'POST',
      body: data
    }).then((response) => {
      // todo
    })
  }
};


export const apiCreate = (data) => {
  if (USE_FIXTURES) {
    data.id = uuid++;
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
