import store from '..';

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
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      outerHeight: window.outerHeight,
      outerWidth: window.outerWidth
    }
  });
}
