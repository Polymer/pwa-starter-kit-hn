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
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../actions/favorites.js';
import { RootAction, RootState } from '../store.js';

export interface FavoritesState {
  [k: string]: true;
};

const favorites: Reducer<FavoritesState, RootAction> = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        [action.item.id]: true
      };
    case REMOVE_FAVORITE:
      const result = { ...state };
      delete result[action.item.id];
      return result;
    default:
      return state;
  }
};

export default favorites;

export const favoritesSelector = (state: RootState) => state.favorites;
