const defaultState = {
  searchResults: [],
  currentSearch: {
    text: ''
  }
};

export default (state = defaultState, {type, payload}) => {
  const newState = {...state};
  switch (type) {
    case 'SEARCH_ITEMS_DONE':
      newState.searchResults = payload;
      return newState;
    default:
      return state;
  }
};
