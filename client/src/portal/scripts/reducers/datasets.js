import * as types from './../actions/_types';
import initialState from './../store/initialState';


const datasetsReducer = (state = initialState.datasets, {type, payload}) => {

  switch (type) {
    case types.SET_DATASETS:
      return state.map((d) => {
        if (d.id === payload.id) {
          return {...d, ...payload}
        }
        return d;
      });
      break;

    case types.UPDATE_DATASETS_FAIL:
    default:
      return state;
  }
};

export default datasetsReducer;


// Selectors

export const getDatasetById = (state, id) => {
  return state.find((d) => Number(id) === d.id);
};

export const getDatasetsByIds = (state, ids) => {
  return state.filter((d) => ids.includes(Number(d.id)));
};
