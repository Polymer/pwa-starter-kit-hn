import users, { currentUserSelector } from '../reducers/users.js';
import { store } from './store.js';
import { pageSelector } from '../reducers/location.js';

store.addReducers({
  users,
});

store.subscribe(() => {
  const state = store.getState();
  if (pageSelector(state) === 'user') {
    document.title = currentUserSelector(state).id;
  }
});
