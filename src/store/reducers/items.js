const defaultState = [];
const session = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_ITEMS_DONE':
      return action.payload;
    default:
      return state;
  }
};

export default session;
