/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import {
  REQUEST_LIST,
  RECEIVE_LIST,
  FAIL_LIST
} from '../actions/lists.js';
import { itemsSelector } from './items.js';
import { favoritesSelector } from './favorites.js';
import { RootAction, RootState } from '../store.js';

export interface ListsState {
  [k: string]: ListState;
};

export interface ListState {
  id?: string;
  pages?: PagesState;
};

export interface PagesState {
  [k: string]: PageState;
};

export interface PageState {
  failure?: boolean;
  isFetching?: boolean;
  items?: Array<string>;
};

const lists: Reducer<ListsState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
    case RECEIVE_LIST:
    case FAIL_LIST:
      const listId = action.listId;
      return {
        ...state,
        [listId]: list(state[listId], action)
      };
    default:
      return state;
  }
};

const list: Reducer<ListState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
    case RECEIVE_LIST:
    case FAIL_LIST:
      return {
        ...state,
        id: action.listId,
        pages: pages(state.pages, action)
      };
    default:
      return state;
  }
};

const pages: Reducer<PagesState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
    case RECEIVE_LIST:
    case FAIL_LIST:
      return {
        ...state,
        [action.page]: page(state[action.page], action)
      };
    default:
      return state;
  }
};

const page: Reducer<PageState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
      return {
        ...state,
        failure: false,
        isFetching: true
      };
    case RECEIVE_LIST:
      return {
        ...state,
        failure: false,
        isFetching: false,
        items: action.items.map(item => item.id)
      };
    case FAIL_LIST:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export default lists;

const listsSelector = (state: RootState) => state.lists;

const listSelector = (state: RootState) => state.app.list;

export const currentListSelector = createSelector(
  listsSelector,
  favoritesSelector,
  listSelector,
  (lists, favorites, list) => {
    if (list === 'favorites') {
      return {
        id: 'favorites',
        pages: {
          '1': {
            items: Object.keys(favorites)
          }
        }
      };
    }
    return list ? lists[list] || { id: list } : null;
  }
);

const pageSelector = (state: RootState) => state.app.page;

export const currentItemsSelector = createSelector(
  currentListSelector,
  pageSelector,
  itemsSelector,
  (list, pageId, items) => {
    if (!list || !pageId) return null;
    const pages = list.pages;
    if (!pages) return null;
    const page = pages[pageId];
    if (!page) return null;
    return page.items ? page.items.map(id => items[id] || { id }) : null;
  }
)
