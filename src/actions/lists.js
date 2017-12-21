export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const FAIL_LIST = 'FAIL_LIST';

export const fetchList = (list) => (dispatch) => {
  dispatch(requestList(list.id));
  fetch(`/api/${list.id}`)
    .then(res => res.json())
    .then(items => dispatch(receiveList(list.id, items)))
    .catch(() => dispatch(failList(list.id)));
};

export const fetchListIfNeeded = (list) => (dispatch) => {
  if (list && !list.items && !list.isFetching) {
    dispatch(fetchList(list));
  }
};

const requestList = (listId) => {
  return {
    type: REQUEST_LIST,
    listId
  };
};

const receiveList = (listId, items) => {
  return {
    type: RECEIVE_LIST,
    listId,
    items
  };
};

const failList = (listId) => {
  return {
    type: FAIL_LIST,
    listId
  };
};
