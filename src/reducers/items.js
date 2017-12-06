import {
  REQUEST_ITEM,
  RECEIVE_ITEM,
  FAIL_ITEM
} from '../actions/items.js';
import { ADD_FAVORITE } from '../actions/favorites.js';
// HACK: Don't need to import list actions just for this.
// import { RECEIVE_LIST } from '../actions/lists.js';
import { createSelector } from '../../../node_modules/reselect/src/index.js';
import { splitPathnameSelector, urlSearchParamsSelector } from './location.js';

const items = (state = {}, action) => {
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
      return action.items.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {...state});
    case ADD_FAVORITE:
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
}

const item = (state = {}, action) => {
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
}

export default items;

export const itemsSelector = state => state.items;

export const currentItemSelector = createSelector(
  itemsSelector,
  splitPathnameSelector,
  urlSearchParamsSelector,
  (items, splitPath, params) => {
    switch (splitPath[0]) {
      case 'item':
        const id = params.get('id');
        return items[id] || { id };
      default:
        return null;
    }
  }
);
