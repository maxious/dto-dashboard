import * as types from './_types';


export const editFormAtDashboardPage = (edit) => ({
  type: types.UI_PAGE_DASHBOARD_FORM_EDIT,
  payload: {
    isEditing: edit
  }
});

export const editFormAtDashboardWidgetPage = (edit) => ({
  type: types.UI_PAGE_DASHBOARDWIDGET_FORM_EDIT,
  payload: {
    isEditing: edit
  }
});

export const editFormAtDatasetPage = (edit) => ({
  type: types.UI_PAGE_DATASET_FORM_EDIT,
  payload: {
    isEditing: edit
  }
});

export const editFormAtDatasetDatapointPage = (edit) => ({
  type: types.UI_PAGE_DATASETDATAPOINT_FORM_EDIT,
  payload: {
    isEditing: edit
  }
});

export const editFormAtDatasetDatapointCreatePage = (edit) => ({
  type: types.UI_PAGE_DATASETDATAPOINTCREATE_FORM_EDIT,
  payload: {
    isEditing: edit
  }
});
