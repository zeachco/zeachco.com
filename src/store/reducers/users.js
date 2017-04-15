const initialState = {
  data: [],
  editedUser: null,
  isLoading: true
}

const session = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'USER_FETCH':
      return {
        ...state,
        isLoading: true,
        data: []
      };
    case 'USER_FETCH_DONE':
      return {
        ...state,
        isLoading: false,
        data: payload.sort((a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1)
      };
    case 'USER_FETCH_FAIL':
      return {
        ...state,
        isLoading: false,
        data: []
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        errorMessage: 'Authentification échouée'
      };
    case 'EDIT_USER':
      const newUser = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        space: ''
      } 
      return {
        ...state,
        editedUser: payload === 'new' ? newUser : state.data.filter(u => u._id === payload)[0]
      };
    case 'USER_CREATE':
      return {
        ...state,
        isLoading: false,
        message: 'Création...',
        messageType: 'info'
      }
    case 'USER_CREATE_DONE':
      return {
        ...state,
        isLoading: false,
        message: 'Utilisateur créé',
        messageType: 'success'
      }
    case 'USER_CREATE_FAIL':
      return {
        ...state,
        isLoading: false,
        message: 'impossible de créer cet utilisateur',
        messageType: 'danger'
      }
    default:
      return state;
  }
};

export default session;
