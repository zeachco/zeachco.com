const initialState = 'en'

const session = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};

export default session;
