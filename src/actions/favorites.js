export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (itemId) => (dispatch) => {
  const transaction = window.db.transaction(['favorites'], 'readwrite');
  const objectStore = transaction.objectStore('favorites');
  const objectStoreRequest = objectStore.add({ id: itemId });

  dispatch({
    type: ADD_FAVORITE,
    itemId
  });
};

export const removeFavorite = (itemId) => (dispatch) => {
  const transaction = window.db.transaction(['favorites'], 'readwrite');
  const objectStore = transaction.objectStore('favorites');
  const objectStoreRequest = objectStore.delete(itemId);

  dispatch({
    type: REMOVE_FAVORITE,
    itemId
  });
};
