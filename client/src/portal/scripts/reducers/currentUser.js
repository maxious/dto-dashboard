import initialState from './../store/initialState';


const currentUserReducer = (state = initialState.currentUser, {type}) => {
  switch (type) {
    default:
      return state;
  }
};

export default currentUserReducer;


// Selectors
