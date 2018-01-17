export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const FAIL_LIST = 'FAIL_LIST';

export const fetchList = (list, page) => (dispatch) => {
  if (!list) return;
  if (!list.pages || !list.pages[page] || (!list.pages[page].items && !list.pages[page].isFetching)) {
    dispatch(requestList(list.id, page));
    return fetch(`https://node-hnapi.herokuapp.com/${list.id}?page=${page}`)
      .then(res => res.json())
      .then(items => dispatch(receiveList(list.id, page, items)))
      .catch(() => dispatch(failList(list.id, page)));
  }
};

const requestList = (listId, page) => {
  return {
    type: REQUEST_LIST,
    listId,
    page
  };
};

const receiveList = (listId, page, items) => {
  return {
    type: RECEIVE_LIST,
    listId,
    page,
    items
  };
};

const failList = (listId, page) => {
  return {
    type: FAIL_LIST,
    listId,
    page
  };
};
