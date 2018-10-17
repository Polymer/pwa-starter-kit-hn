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

export const REQUEST_ITEM = 'REQUEST_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const FAIL_ITEM = 'FAIL_ITEM';

export interface ItemsActionRequestItem extends Action<'REQUEST_ITEM'> {
  itemId: string
};
export interface ItemsActionReceiveItem extends Action<'RECEIVE_ITEM'> {
  itemId: string;
  data: object;
};
export interface ItemsActionFailItem extends Action<'FAIL_ITEM'> {
  itemId: string
};
export type ItemsAction = ItemsActionRequestItem | ItemsActionReceiveItem | ItemsActionFailItem;

type ThunkResult = ThunkAction<void, RootState, undefined, ItemsAction>;

export const fetchItem: ActionCreator<ThunkResult> = (item) => (dispatch) => {
  dispatch(requestItem(item.id));
  fetch(`https://node-hnapi.herokuapp.com/item/${item.id}`)
    .then(res => res.json())
    .then(data => dispatch(receiveItem(item.id, data)))
    .catch(() => dispatch(failItem(item.id)));
};

export const fetchItemIfNeeded: ActionCreator<ThunkResult> = (item) => (dispatch) => {
  if (item && !item.comments && !item.isFetching) {
    dispatch(fetchItem(item));
  }
};

const requestItem: ActionCreator<ItemsActionRequestItem> = (itemId) => {
  return {
    type: REQUEST_ITEM,
    itemId
  };
};

const receiveItem: ActionCreator<ItemsActionReceiveItem> = (itemId, data) => {
  return {
    type: RECEIVE_ITEM,
    itemId,
    data
  };
};

const failItem: ActionCreator<ItemsActionFailItem> = (itemId) => {
  return {
    type: FAIL_ITEM,
    itemId
  };
};
