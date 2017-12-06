import lists, { currentListSelector } from '../reducers/lists.js';
import { store } from './store.js';
import { pageSelector } from '../reducers/location.js';

store.addReducers({
  lists
});

store.subscribe(() => {
  const state = store.getState();
  if (pageSelector(state) === 'list') {
    document.title = currentListSelector(state).id;
  }
});
