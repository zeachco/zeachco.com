const initialState = {
  isAuth: false,
  isLoading: true
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION_FETCH':
      return {
        isAuth: false,
        isLoading: true
      };
    case 'SESSION_FETCH_DONE':
      return Object.assign({
        isLoading: false,
        isAuth: !!action.payload,
      }, action.payload);
    case 'SESSION_FETCH_FAIL':
      return {
        isLoading: false,
        isAuth: false
      };
    case 'SESSION_LOGIN_FAIL':
      return {
        isLoading: false,
        isAuth: false,
        errorMessage: 'Authentification échouée'
      };
    case 'DISCONNECT_START':
      return Object.assign({
        isAuth: false,
        isLoading: true
      }, state);
    case 'DISCONNECT_DONE':
      return {
        isAuth: false,
        isLoading: false
      };
    case 'redux-form/CHANGE':
      if (action.form === 'profile') {
        state = Object.assign({}, state);
        state[action.field] = action.value;
      }
      return state;
    case 'PROFILE_UPDATE_START':
      return Object.assign({}, state, {
        isSaving: true
      });
    case 'PROFILE_UPDATE_DONE':
      return Object.assign({}, state, action.payload, {
        isSaving: false
      });
    default:
      return state;
  }
};

export default session;
