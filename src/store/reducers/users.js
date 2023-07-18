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
      const emptyUser = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        space: ''
      }
      const newState = {...state};
      if (payload === 'new') {
        newState.editedUser = emptyUser;
      } else {
        const user = state.data.filter(u => u._id === payload)[0];
        newState.editedUser = user ? {...emptyUser, ...user} : null;
      }
      return newState;
    case 'USER_CREATE':
      return {
        ...state,
        isLoading: false
      }
    case 'USER_CREATE_DONE':
      return {
        ...state,
        isLoading: false,
        editedUser: null
      }
    case 'USER_CREATE_FAIL':
      return {
        ...state,
        isLoading: false
      }
    case 'USER_UPDATE':
      return {
        ...state,
        isLoading: false
      }
    case 'USER_UPDATE_DONE':
      return {
        ...state,
        isLoading: false,
        editedUser: null
      }
      case 'USER_UPDATE_FAIL':
        return {
          ...state,
          isLoading: false
        }
      case 'USER_DESTROY':
        const newData = state.data.filter(u => u._id !== payload);
        return {
          ...state,
          data: newData
        }
    default:
      return state;
  }
};

export default session;
