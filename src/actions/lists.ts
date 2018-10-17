/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const FAIL_LIST = 'FAIL_LIST';

export interface ListsActionRequestList extends Action<'REQUEST_LIST'> {
  listId: string;
  page: number;
};
export interface ListsActionReceiveList extends Action<'RECEIVE_LIST'> {
  listId: string;
  page: number;
  items: Array<{id: string}>;
};
export interface ListsActionFailList extends Action<'FAIL_LIST'> {
  listId: string;
  page: number;
};
export type ListsAction = ListsActionRequestList | ListsActionReceiveList | ListsActionFailList;

type ThunkResult = ThunkAction<void, RootState, undefined, ListsAction>;

export const fetchList: ActionCreator<ThunkResult> = (list, page) => (dispatch) => {
  dispatch(requestList(list.id, page));
  fetch(`https://node-hnapi.herokuapp.com/${list.id}?page=${page}`)
    .then(res => res.json())
    .then(items => dispatch(receiveList(list.id, page, items)))
    .catch(() => dispatch(failList(list.id, page)));
};

export const fetchListIfNeeded: ActionCreator<ThunkResult> = (list, page) => (dispatch) => {
  if (!list) return;
  if (!list.pages ||
      !list.pages[page] ||
      (!list.pages[page].items && !list.pages[page].isFetching)) {
    dispatch(fetchList(list, page));
  }
};

const requestList: ActionCreator<ListsActionRequestList> = (listId, page) => {
  return {
    type: REQUEST_LIST,
    listId,
    page
  };
};

const receiveList: ActionCreator<ListsActionReceiveList> = (listId, page, items) => {
  return {
    type: RECEIVE_LIST,
    listId,
    page,
    items
  };
};

const failList: ActionCreator<ListsActionFailList> = (listId, page) => {
  return {
    type: FAIL_LIST,
    listId,
    page
  };
};
