import {
  REQUEST_ITEM,
  RECEIVE_ITEM,
  FAIL_ITEM
} from '../actions/items.js';
// HACK: Don't need to import list actions just for this.
// import { RECEIVE_LIST } from '../actions/lists.js';
import { createSelector } from '../../../node_modules/reselect/es/index.js';
import { splitPathnameSelector } from './location.js';

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
  (items, splitPath) => {
    switch (splitPath[0]) {
      case 'item':
        return items[splitPath[1]] || { id: splitPath[1] };
      default:
        return null;
    }
  }
);
