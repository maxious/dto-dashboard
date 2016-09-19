import * as types from './../actions/_types';
import initialState from './../store/initialState';
import { combineReducers } from 'redux';


let pageDashboard = (state = initialState.ui.pageDashboard, action) => {
  let { payload } = action;

  switch (action.type) {
    case types.UI_PAGE_DASHBOARD_FORM_EDIT:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;
    default:
      return state;
  }
};


let pageDashboardWidget = (state = initialState.ui.pageDashboard, action) => {
  let { payload } = action;

  switch (action.type) {
    case types.UI_PAGE_DASHBOARDWIDGET_FORM_EDIT:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;
    default:
      return state;
  }
};


let pageDataset = (state = initialState.ui.pageDashboard, action) => {
  let { payload } = action;

  switch (action.type) {
    case types.UI_PAGE_DATASET_FORM_EDIT:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;
    default:
      return state;
  }
};


let pageDatasetDatapoint = (state = initialState.ui.pageDashboard, action) => {
  let { payload } = action;

  switch (action.type) {
    case types.UI_PAGE_DATASETDATAPOINT_FORM_EDIT:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;
    default:
      return state;
  }
};


let pageDatasetDatapointCreate = (state = initialState.ui.pageDashboard, action) => {
  switch (action.type) {
    default:
      return state;
  }
};



const uiReducer = combineReducers({
  pageDashboard,
  pageDashboardWidget,
  pageDataset,
  pageDatasetDatapoint,
  pageDatasetDatapointCreate
});


export default uiReducer;


// Helpers
