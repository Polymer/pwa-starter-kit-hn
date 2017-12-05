import { addFavorite } from '../actions/favorites.js';
import favorites from '../reducers/favorites.js';
import items from '../reducers/items.js';
import { store } from '../store.js';

store.addReducers({
  favorites,
  items
});

const openRequest = window.indexedDB.open('favorites', 5);
openRequest.onsuccess = (event) => {
  const db = event.target.result;
  const objectStore = db.transaction('favorites').objectStore('favorites');
  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      store.dispatch(addFavorite(cursor.value.id));
      cursor.continue();
    }
  }

  // This db reference is available only after openRequest completes and needs to
  // be available to action creators. An alternative would be to instead subscribe
  // to store updates and updated the DB here in this file, but then we only have
  // the complete state with all the favorites (not just the one that changed), so
  // we can't quickly add/delete a single item without diffing.
  console.log(window.db = db);
};
openRequest.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('favorites', { keyPath: 'id' });
};
