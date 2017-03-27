const initialState = {
  data: [],
  isLoading: true
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH':
      return {
        isLoading: true,
        data: []
      };
    case 'CATEGORIES_FETCH_DONE':
      return {
        isLoading: false,
        data: action.payload
      };
    case 'CATEGORIES_FETCH_FAIL':
      return {
        isLoading: false,
        data: []
      };
    default:
      return state;
  }
};

export default categories;
