import * as types from './../actions/_types';
import initialState from './../store/initialState';
import { combineReducers } from 'redux';


let pageDashboard = (state = initialState.ui.pageDashboard, {type, payload}) => {

  switch (type) {
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


let pageDashboardWidget = (state = initialState.ui.pageDashboardWidget, {type, payload}) => {

  switch (type) {
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


let pageDataset = (state = initialState.ui.pageDataset, {type, payload}) => {

  switch (type) {
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


let pageDatasetDatapoint = (state = initialState.ui.pageDatasetDatapoint, {type, payload}) => {

  switch (type) {
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


let pageDatasetDatapointCreate = (state = initialState.ui.pageDatasetDatapointCreate, {type, payload}) => {

  switch (type) {
    case types.UI_PAGE_DATASETDATAPOINTCREATE_FORM_EDIT:
      return {
        ...state,
        isEditing: payload.isEditing
      };
      break;

    default:
      return state;
  }
};


const toastsReducer = (state = {}, {type, payload}) => {

  switch (type) {
    case types.SET_TOAST:
      return payload;
      break;

    case types.CLEAR_TOAST:
      return null;
      break;

    default:
      return state;
  }
};


const uiReducer = combineReducers({
  pageDashboard,
  pageDashboardWidget,
  pageDataset,
  pageDatasetDatapoint,
  pageDatasetDatapointCreate,
  toast: toastsReducer
});


export default uiReducer;


// Selectors
