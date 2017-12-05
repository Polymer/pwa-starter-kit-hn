export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (item) => (dispatch) => {
  const transaction = window.db.transaction(['favorites'], 'readwrite');
  const objectStore = transaction.objectStore('favorites');
  const objectStoreRequest = objectStore.add(item);

  dispatch({
    type: ADD_FAVORITE,
    item
  });
};

export const removeFavorite = (item) => (dispatch) => {
  const transaction = window.db.transaction(['favorites'], 'readwrite');
  const objectStore = transaction.objectStore('favorites');
  const objectStoreRequest = objectStore.delete(item.id);

  dispatch({
    type: REMOVE_FAVORITE,
    item
  });
};
