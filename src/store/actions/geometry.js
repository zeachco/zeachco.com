import store from '..';

const {dispatch} = store;

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
}

window.addEventListener('scroll', dispatchScroll);
window.addEventListener('resize', dispatchResize);
