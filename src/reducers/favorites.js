import {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../actions/favorites.js';

const favorites = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        [action.itemId]: true
      };
    case REMOVE_FAVORITE:
      const result = { ...state };
      delete result[action.itemId];
      return result;
    default:
      return state;
  }
}

export default favorites;
