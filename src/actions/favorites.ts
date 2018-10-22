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

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface FavoritesActionAddFavorite extends Action<'ADD_FAVORITE'> {
  item: {id: string};
};
export interface FavoritesActionRemoveFavorite extends Action<'REMOVE_FAVORITE'> {
  item: {id: string};
};
export type FavoritesAction = FavoritesActionAddFavorite | FavoritesActionRemoveFavorite;

type ThunkResult = ThunkAction<void, RootState, undefined, FavoritesAction>;

const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
  const openRequest = window.indexedDB.open('favorites', 5);
  openRequest.onsuccess = (event) => {
    const target = event.target as IDBRequest<IDBDatabase>;
    resolve(target.result);
  };
  openRequest.onupgradeneeded = (event) => {
    const target = event.target as IDBRequest<IDBDatabase>;
    target.result.createObjectStore('favorites', { keyPath: 'id' });
  };
  openRequest.onerror = (error) => {
    reject(error);
  };
});

export const saveFavorite: ActionCreator<ThunkResult> = (item) => (dispatch) => {
  dbPromise.then((db) => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.add({
      comments_count: item.comments_count,
      domain: item.domain,
      id: item.id,
      points: item.points,
      time: item.time,
      time_ago: item.time_ago,
      title: item.title,
      type: item.type,
      url: item.url,
      user: item.user
    });
    objectStoreRequest.onsuccess = () => {
      dispatch(addFavorite(item));
    };
  });
};

const addFavorite: ActionCreator<FavoritesActionAddFavorite> = (item) => {
  return {
    type: ADD_FAVORITE,
    item
  };
};

export const deleteFavorite: ActionCreator<ThunkResult> = (item) => (dispatch) => {
  dbPromise.then((db) => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.delete(item.id);
    objectStoreRequest.onsuccess = () => {
      dispatch({
        type: REMOVE_FAVORITE,
        item
      });
    };
  });
};

let loaded = false;

export const loadFavorites: ActionCreator<ThunkResult> = () => (dispatch) => {
  if (loaded) return;
  loaded = true;
  dbPromise.then((db) => {
    const objectStore = db.transaction('favorites').objectStore('favorites');
    objectStore.openCursor().onsuccess = (event) => {
      const target = event.target as IDBRequest<IDBCursorWithValue | null>;
      const cursor = target.result;
      if (cursor) {
        dispatch(addFavorite(cursor.value));
        cursor.continue();
      }
    }
  });
};
