/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  StoreEnhancer,
  Reducer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers';
import { AppAction } from './actions/app.js';
import { FavoritesAction } from './actions/favorites.js';
import { ItemsAction } from './actions/items.js';
import { ListsAction } from './actions/lists.js';
import { UsersAction } from './actions/users.js';
import app, { AppState } from './reducers/app.js';
import { FavoritesState } from './reducers/favorites.js';
import { ItemsState } from './reducers/items.js';
import { ListsState } from './reducers/lists.js';
import { UsersState } from './reducers/users.js';

export interface RootState {
  app: AppState;
  favorites: FavoritesState;
  items: ItemsState;
  lists: ListsState;
  users: UsersState;
}

export type RootAction = AppAction | FavoritesAction | ItemsAction | ListsAction | UsersAction;

const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state => state as Reducer<RootState, RootAction>,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
);

store.addReducers({
  app,
});
