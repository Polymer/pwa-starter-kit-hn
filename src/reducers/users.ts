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
  REQUEST_USER,
  RECEIVE_USER,
  FAIL_USER
} from '../actions/users.js';
import { idSelector } from './app.js';
import { RootAction, RootState } from '../store.js';

export interface UsersState {
  [k: string]: UserState
}

export interface UserState {
  id: string
}

const users: Reducer<UsersState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USER:
    case RECEIVE_USER:
    case FAIL_USER:
      const userId = action.userId;
      return {
        ...state,
        [userId]: user(state[userId], action)
      };
    default:
      return state;
  }
}

const user = (state: UserState, action: RootAction) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        id: action.userId,
        failure: false,
        isFetching: true
      };
    case RECEIVE_USER:
      return {
        ...state,
        failure: false,
        isFetching: false,
        ...action.data
      };
    case FAIL_USER:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
}

export default users;

const usersSelector = (state: RootState) => state.users;

export const currentUserSelector = createSelector(
  usersSelector,
  idSelector,
  (users, id) => {
    return id ? users![id] || { id } : null;
  }
);
