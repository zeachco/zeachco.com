const initialState = {
  show: false,
  header: '',
  text: '',
  buttons: []
};

export default function modal (state = initialState, action) {
  switch (action.type) {
    case 'MODAL_SHOW':
      return {
        ...state,
        show: true,
        header: (action.payload && action.payload.text) || '',
        text: (action.payload && action.payload.text) || '',
        buttons: (action.payload && action.payload.buttons) || []
      };
    case 'MODAL_HIDE':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
