import * as types from './../actions/_types';
import initialState from './../store/initialState';
import { combineReducers } from 'redux';


let pageDashboard = (state = initialState.ui.pageDashboard, action) => {
  let { payload } = action;

  switch (action.type) {
    case types.UI_PAGE_DASHBOARD_EDIT_DASHBOARD:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;
    default:
      return state;
  }
};

const uiReducer = combineReducers({
  pageDashboard: pageDashboard
});


export default uiReducer;


// Helpers
