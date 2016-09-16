import * as types from './_types';


export const editDashboard = (edit, id) => {
  return {
    type: types.UI_EDIT_DASHBOARD,
    payload: {
      isEditing: edit
    },
    meta: id ? {
      id
    } : null
  }
};
