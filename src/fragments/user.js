import users from '../reducers/users.js';
import { store } from '../store.js';
import { HnUserElement } from '../elements/hn-user-element.js';

store.addReducers({
  users,
});

// Define element only after adding the reducers it needs
customElements.define('hn-user', HnUserElement);

export { currentUserSelector } from '../reducers/users.js';
export { fetchUserIfNeeded } from '../actions/users.js';
