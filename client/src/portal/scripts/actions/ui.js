import * as types from './_types';


export const editDashboardAtDashboardPage = (edit) => {
  return {
    type: types.UI_PAGE_DASHBOARD_EDIT_DASHBOARD,
    payload: {
      isEditing: edit
    }
  }
};
