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

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FAIL_USER = 'FAIL_USER';

export interface UsersActionRequestUser extends Action<'REQUEST_USER'> {
  userId: string;
};
export interface UsersActionReceiveUser extends Action<'RECEIVE_USER'> {
  userId: string;
  data: object;
};
export interface UsersActionFailUser extends Action<'FAIL_USER'> {
  userId: string;
};
export type UsersAction = UsersActionRequestUser | UsersActionReceiveUser | UsersActionFailUser;

type ThunkResult = ThunkAction<void, RootState, undefined, UsersAction>;

export const fetchUser: ActionCreator<ThunkResult> = (user) => (dispatch) => {
  dispatch(requestUser(user.id));
  fetch(`/api/user/${user.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      }
      dispatch(receiveUser(user.id, data))
    })
    .catch(() => dispatch(failUser(user.id)));
};

export const fetchUserIfNeeded: ActionCreator<ThunkResult> = (user) => (dispatch) => {
  if (user && !user.created_time && !user.isFetching) {
    dispatch(fetchUser(user));
  }
};

const requestUser: ActionCreator<UsersActionRequestUser> = (userId) => {
  return {
    type: REQUEST_USER,
    userId
  };
};

const receiveUser: ActionCreator<UsersActionReceiveUser> = (userId, data) => {
  return {
    type: RECEIVE_USER,
    userId,
    data
  };
};

const failUser: ActionCreator<UsersActionFailUser> = (userId) => {
  return {
    type: FAIL_USER,
    userId
  };
};
