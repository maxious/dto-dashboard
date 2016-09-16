import * as types from './../actions/_types';
import initialState from './../store/initialState';


const uiReducer = (state = initialState.ui, action) => {
  switch (action.type) {

    case types.UI_EDIT_DASHBOARD:
      return {
        ...state,
        isEditing: action.payload.isEditing ? {
          ...action.meta
        } : null
      };
      break;

    default:
      return state;
  }
};

export default uiReducer;


// Helpers
