import {
  REQUEST_LIST,
  RECEIVE_LIST,
  FAIL_LIST
} from '../actions/lists.js';
import { createSelector } from '../../../node_modules/reselect/src/index.js';
import { splitPathnameSelector } from './location.js';
import { itemsSelector } from './items.js';
import { favoritesSelector } from './favorites.js';

const lists = (state = {}, action) => {
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
}

const list = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LIST:
      return {
        ...state,
        id: action.listId,
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
}

export default lists;

const listsSelector = state => state.lists;

export const currentListSelector = createSelector(
  listsSelector,
  favoritesSelector,
  splitPathnameSelector,
  (lists, favorites, splitPath) => {
    switch (splitPath[0]) {
      case '':
        return lists['news'] || { id: 'news' };
      case 'new':
        return lists['newest'] || { id: 'newest' };
      case 'ask':
      case 'show':
      case 'jobs':
        return lists[splitPath[0]] || { id: splitPath[0] };
      case 'favorites':
        return { id: 'favorites', items: Object.keys(favorites).map(id => parseInt(id, 10)) };
      default:
        return null;
    }
  }
);

export const currentItemsSelector = createSelector(
  currentListSelector,
  itemsSelector,
  (list, items) => {
    return list && list.items ? list.items.map(id => items[id] || { id }) : null;
  }
)
