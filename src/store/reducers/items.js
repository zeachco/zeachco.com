const defaultState = {
  searchResults: [],
  currentSearch: {
    query: ''
  }
};

export default (state = defaultState, {type, payload}) => {
  const newState = {...state};
  switch (type) {
    case 'SEARCH_ITEMS_DONE':
      newState.searchResults = payload;
      return newState;
    case 'SEARCH_ITEMS_START':
      newState.currentSearch = payload || {};
      newState.currentSearch.query = newState.currentSearch.query || '';
      return newState;
    default:
      return state;
  }
};
