import initialState from './../store/initialState';
import * as types from './../actions/_types';


const widget = (state = {}, action) => {
  switch (action.type) {

    case types.CREATE_WIDGET:
      return action.payload;

    default:
      return state;
  }
};

const widgetsReducer = (state = initialState.widgets, action) => {
  switch (action.type) {

    case types.CREATE_WIDGETS:
      let list = action.payload.map((p) => {
        return widget('', Object.assign({
          type: types.CREATE_WIDGET,
          payload: p
        }))
      });
      return state.concat(list);

    case types.CREATE_WIDGET:
      return [
        ...state,
        widget('', action)
      ];

    default:
      return state;
  }
};

export default widgetsReducer;


// Helpers

export const getWidgetDatasets = widget_state => {
  return widget_state.find(() => id === widget_state.id);
};
