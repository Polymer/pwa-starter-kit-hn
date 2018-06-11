/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FAIL_USER = 'FAIL_USER';

export const fetchUser = (user) => (dispatch) => {
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

export const fetchUserIfNeeded = (user) => (dispatch) => {
  if (user && !user.created_time && !user.isFetching) {
    dispatch(fetchUser(user));
  }
};

const requestUser = (userId) => {
  return {
    type: REQUEST_USER,
    userId
  };
};

const receiveUser = (userId, data) => {
  return {
    type: RECEIVE_USER,
    userId,
    data
  };
};

const failUser = (userId) => {
  return {
    type: FAIL_USER,
    userId
  };
};
