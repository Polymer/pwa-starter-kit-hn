import { loadFavorites } from '../actions/favorites.js';
import favorites from '../reducers/favorites.js';
import items, { currentItemSelector } from '../reducers/items.js';
import { store } from './store.js';
import { pageSelector } from '../reducers/location.js';

store.addReducers({
  favorites,
  items
});

store.dispatch(loadFavorites());

store.subscribe(() => {
  const state = store.getState();
  if (pageSelector(state) === 'item') {
    document.title = currentItemSelector(state).title;
  }
});
