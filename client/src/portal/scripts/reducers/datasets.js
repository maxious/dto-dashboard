import * as types from './../actions/_types';
import initialState from './../store/initialState';


const datasetsReducer = (state = initialState.datasets, action) => {
  switch (action.type) {

    case types.UPDATE_DATASET_SUCCESS:
      return state.map((d) => {
        if (d.id === action.payload.id) {
          return {...d, ...action.payload}
        }
        return d;
      });
      break;

    case types.UPDATE_DATASET_FAIL:
    default:
      return state;
  }
};

export default datasetsReducer;


// Helpers

export const getDatasetById = (state, id) => {
  return state.find((d) => Number(id) === d.id);
};

export const getDatasetsByIds = (state, ids) => {
  return state.filter((d) => ids.includes(Number(d.id)));
};
