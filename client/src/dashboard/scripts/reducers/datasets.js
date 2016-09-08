import initialState from './../store/initialState';
import * as types from './../actions/_types';


const dataset = (state = {}, action) => {
  switch (action.type) {

    case types.CREATE_DATASET:
      return action.payload;

    default:
      return state;
  }
};

const datasetsReducer = (state = initialState.datasets, action) => {
  switch (action.type) {

    case types.CREATE_DATASETS:
      let list = action.payload.map((p) => {
        return dataset('', Object.assign({
          type: types.CREATE_DATASET,
          payload: p
        }))
      });
      return state.concat(list);

    case types.CREATE_DATASET:
      return [
        ...state,
        dataset('', action)
      ];

    default:
      return state;
  }
};

export default datasetsReducer;


// Helpers

export const getDatasetsByWidgetId = (state, widget_id) => {
  return state.filter((d) => d.widget_id === widget_id);
};
