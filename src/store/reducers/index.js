import session from './session';
import items from './items';
import users from './users';
import categories from './categories';
import geometry from './geometry';
import notifications from './notifications';
import language from './language';

export default (state = {}, action) => {
    const newState = { ...state };
    return {
      session: session(state.session, action, newState),
      items: items(state.items, action, newState),
      users: users(state.users, action, newState),
      categories: categories(state.categories, action, newState),
      geometry: geometry(state.geometry, action, newState),
      notifications: notifications(state.notifications, action, newState),
      language: language(state.language, action, newState)
    };
};
