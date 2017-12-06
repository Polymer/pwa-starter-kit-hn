export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

export const fetchItem = (item) => (dispatch) => {
  dispatch(requestItem(item.id));
  fetch(`https://node-hnapi.herokuapp.com/item/${item.id}`)
    .then(res => res.json())
    .then(data => dispatch(receiveItem(item.id, data)))
    .catch(() => dispatch(failItem(item.id)));
};

export const fetchItemIfNeeded = (item) => (dispatch) => {
  if (item && !item.comments && !item.isFetching) {
    dispatch(fetchItem(item));
  }
};

const requestItem = (itemId) => {
  return {
    type: REQUEST_ITEM,
    itemId
  };
};

const receiveItem = (itemId, data) => {
  return {
    type: RECEIVE_ITEM,
    itemId,
    data
  };
};

const failItem = (itemId) => {
  return {
    type: FAIL_ITEM,
    itemId
  };
};
