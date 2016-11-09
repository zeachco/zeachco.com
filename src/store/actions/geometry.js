import store from '..';
import {addToastMessage} from './notifications';

const {dispatch} = store;
window.addEventListener('scroll', dispatchScroll);
window.addEventListener('resize', dispatchResize);

function dispatchScroll() {
  dispatch({
    type: 'WINDOW_SCROLL',
    payload: {
      scrollX: window.scrollX,
      scrollY: window.scrollY
    }
  });
}

function dispatchResize() {
  dispatch({
    type: 'WINDOW_RESIZE',
    payload: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight
    }
  });
  addToastMessage({message: `Dimensions: ${window.innerWidth}x${window.innerHeight}`})
}
