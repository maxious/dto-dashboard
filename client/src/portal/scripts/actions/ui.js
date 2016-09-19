import * as types from './_types';


export const editFormAtDashboardPage = (edit) => {
  return {
    type: types.UI_PAGE_DASHBOARD_FORM_EDIT,
    payload: {
      isEditing: edit
    }
  }
};

export const editFormAtDashboardWidgetPage = (edit) => {
  return {
    type: types.UI_PAGE_DASHBOARDWIDGET_FORM_EDIT,
    payload: {
      isEditing: edit
    }
  }
};

export const editFormAtDatasetDatapointPage = (edit) => {
  return {
    type: types.UI_PAGE_DATASETDATAPOINT_FORM_EDIT,
    payload: {
      isEditing: edit
    }
  }
};
