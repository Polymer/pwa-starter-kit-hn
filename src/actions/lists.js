export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const FAIL_LIST = 'FAIL_LIST';

export const fetchList = (list) => (dispatch) => {
  if (list && !list.items && !list.isFetching) {
    dispatch(requestList(list.id));
    return fetch(`https://node-hnapi.herokuapp.com/${list.id}`)
      .then(res => res.json())
      .then(items => dispatch(receiveList(list.id, items)))
      .catch(() => dispatch(failList(list.id)));
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
