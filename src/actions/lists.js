/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const FAIL_LIST = 'FAIL_LIST';

export const fetchList = (list, page) => (dispatch) => {
  dispatch(requestList(list.id, page));
  fetch(`/api/${list.id}?page=${page}`)
    .then(res => res.json())
    .then(items => dispatch(receiveList(list.id, page, items)))
    .catch(() => dispatch(failList(list.id, page)));
};

export const fetchListIfNeeded = (list, page) => (dispatch) => {
  if (!list) return;
  if (!list.pages ||
      !list.pages[page] ||
      (!list.pages[page].items && !list.pages[page].isFetching)) {
    dispatch(fetchList(list, page));
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
