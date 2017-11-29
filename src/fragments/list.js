import lists from '../reducers/lists.js';
import items from '../reducers/items.js';
import { store } from '../store.js';
import { HnListElement } from '../elements/hn-list-element.js';

store.addReducers({
  lists,
  items
});

// Define element only after adding the reducers it needs
customElements.define('hn-list', HnListElement);

export { currentListSelector } from '../reducers/lists.js';
export { fetchList } from '../actions/lists.js';
