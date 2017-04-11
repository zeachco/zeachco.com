import session from './session';
import items from './items';
import users from './users';
import categories from './categories';
import geometry from './geometry';
import notifications from './notifications';
import language from './language';

export default (state = {}, action) => {
    return {
      session: session(state.session, action, state),
      items: items(state.items, action, state),
      users: users(state.users, action, state),
      categories: categories(state.categories, action, state),
      geometry: geometry(state.geometry, action, state),
      notifications: notifications(state.notifications, action, state),
      language: language(state.language, action, state)
    };
};
