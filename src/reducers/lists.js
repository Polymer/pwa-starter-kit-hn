import {
  REQUEST_LIST,
  RECEIVE_LIST,
  FAIL_LIST
} from '../actions/lists.js';
import { createSelector } from '../../node_modules/reselect/src/index.js';
import { splitPathnameSelector, pageParamSelector } from './location.js';
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
}

const pages = (state = {}, action) => {
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
}

const page = (state = {}, action) => {
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
        return {
          id: 'favorites',
          pages: {
            '1': {
              items: Object.keys(favorites).map(id => parseInt(id, 10))
            }
          }
        };
      default:
        return null;
    }
  }
);

export const currentItemsSelector = createSelector(
  currentListSelector,
  pageParamSelector,
  itemsSelector,
  (list, pageId, items) => {
    const pages = list.pages;
    if (!pages) return null;
    const page = pages[pageId];
    if (!page) return null;
    return page.items ? page.items.map(id => items[id] || { id }) : null;
  }
)
