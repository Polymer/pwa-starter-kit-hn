export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const dbPromise = window.dbPromise = new Promise((resolve, reject) => {
  const openRequest = window.indexedDB.open('favorites', 5);
  openRequest.onsuccess = (event) => {
    resolve(event.target.result);
  };
  openRequest.onupgradeneeded = (event) => {
    event.target.result.createObjectStore('favorites', { keyPath: 'id' });
  };
  openRequest.onerror = (error) => {
    reject(error);
  };
});

export const saveFavorite = (item) => (dispatch) => {
  dbPromise.then((db) => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.add({
      comments_count: item.comments_count,
      domain: item.domain,
      id: item.id,
      points: item.points,
      time: item.time,
      time_ago: item.time_ago,
      title: item.title,
      type: item.type,
      url: item.url,
      user: item.user
    });
    objectStoreRequest.onsuccess = () => {
      dispatch(addFavorite(item));
    };
  });
};

const addFavorite = (item) => (dispatch) => {
  dispatch({
    type: ADD_FAVORITE,
    item
  });
};

export const deleteFavorite = (item) => (dispatch) => {
  dbPromise.then((db) => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.delete(item.id);
    objectStoreRequest.onsuccess = () => {
      dispatch({
        type: REMOVE_FAVORITE,
        item
      });
    };
  });
};

let loaded = false;

export const loadFavorites = () => (dispatch) => {
  if (loaded) return;
  loaded = true;
  dbPromise.then((db) => {
    const objectStore = db.transaction('favorites').objectStore('favorites');
    objectStore.openCursor().onsuccess = function(event) {
      const cursor = event.target.result;
      if (cursor) {
        dispatch(addFavorite(cursor.value));
        cursor.continue();
      }
    }
  });
};
