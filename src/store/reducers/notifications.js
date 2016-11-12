const notifications = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOAST_MESSAGE':
      return [...state, action.payload];
    case 'REMOVE_TOAST_MESSAGE':
      const clone = [...state];
      for(let i = 0; i < clone.length; i++) {
        if(clone[i].messageId === action.payload) {
          clone.splice(i, 1);
          return clone;
        }
      }
      return state;
    default:
      return state;
  }
};

export default notifications;
