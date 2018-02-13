/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { createSelector } from '../../node_modules/reselect/src/index.js';
import {
  REQUEST_USER,
  RECEIVE_USER,
  FAIL_USER
} from '../actions/users.js';
import { splitPathnameSelector, urlSearchParamsSelector } from './location.js';

const users = (state = {}, action) => {
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

const user = (state = {}, action) => {
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

const usersSelector = state => state.users;

export const currentUserSelector = createSelector(
  usersSelector,
  splitPathnameSelector,
  urlSearchParamsSelector,
  (users, splitPath, params) => {
    switch (splitPath[0]) {
      case 'user':
        const id = params.get('id');
        return users[id] || { id };
      default:
        return null;
    }
  }
);
