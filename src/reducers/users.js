import {
  REQUEST_USER,
  RECEIVE_USER,
  FAIL_USER
} from '../actions/users.js';
import { createSelector } from '../../../node_modules/reselect/es/index.js';
import { splitPathnameSelector } from './location.js';

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
  (users, splitPath) => {
    switch (splitPath[0]) {
      case 'user':
        return users[splitPath[1]] || { id: splitPath[1] };
      default:
        return null;
    }
  }
);
