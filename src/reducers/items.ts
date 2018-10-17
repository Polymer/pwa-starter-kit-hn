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
  REQUEST_ITEM,
  RECEIVE_ITEM,
  FAIL_ITEM
} from '../actions/items.js';
// NOTE: No need to import these actions just for the action types.
// import { RECEIVE_LIST } from '../actions/lists.js';
// import { ADD_FAVORITE } from '../actions/favorites.js';
import { idSelector } from './app.js';
import { RootAction, RootState } from '../store.js';

export interface ItemsState {
  [k: string]: ItemState;
};

export interface ItemState {
  id: string;
};

const items: Reducer<ItemsState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ITEM:
    case RECEIVE_ITEM:
    case FAIL_ITEM:
      const itemId = action.itemId;
      return {
        ...state,
        [itemId]: item(state[itemId], action)
      };
    case 'RECEIVE_LIST':
      return action.items.reduce((obj: ItemsState, item) => {
        obj[item.id] = item;
        return obj;
      }, {...state});
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

const item = (state: ItemState, action: RootAction) => {
  switch (action.type) {
    case REQUEST_ITEM:
      return {
        ...state,
        id: action.itemId,
        failure: false,
        isFetching: true
      };
    case RECEIVE_ITEM:
      return {
        ...state,
        failure: false,
        isFetching: false,
        ...action.data
      };
    case FAIL_ITEM:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export default items;

export const itemsSelector = (state: RootState) => state.items;

export const currentItemSelector = createSelector(
  itemsSelector,
  idSelector,
  (items, id) => {
    return id ? items![id] || { id } : null;
  }
);
