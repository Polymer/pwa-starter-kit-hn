export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (item) => (dispatch) => {
  const transaction = window.db.transaction(['favorites'], 'readwrite');
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
