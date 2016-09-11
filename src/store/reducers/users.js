const initialState = {
  data: [],
  isLoading: true
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_FETCH':
      return [{
        isLoading: true,
        data: []
      }];
    case 'USER_FETCH_DONE':
      return {
        isLoading: false,
        data: action.payload
      };
    case 'USER_FETCH_FAIL':
      return {
        isLoading: false,
        data: []
      };
    case 'USER_LOGIN_FAIL':
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
