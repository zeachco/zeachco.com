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
    case 'USER_CREATE':
      return {
        isLoading: false,
        message: 'Création...',
        messageType: 'info'
      }
    case 'USER_CREATE_DONE':
      return {
        isLoading: false,
        message: 'Utilisateur créé',
        messageType: 'success'
      }
    case 'USER_CREATE_FAIL':
      return {
        isLoading: false,
        message: 'impossible de créer cet utilisateur',
        messageType: 'danger'
      }
    default:
      return state;
  }
};

export default session;
