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

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export interface AppActionUpdateLocation extends Action<'UPDATE_LOCATION'> {
  view: string;
  list?: string;
  page: number;
  id: string;
};
export type AppAction = AppActionUpdateLocation;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const updateLocation: ActionCreator<ThunkResult> = (location: Location) => (dispatch, getState) => {
  const path = decodeURIComponent(location.pathname);
  const splitPath = (path || '').slice(1).split('/');
  const params = location.search.slice(1).split('&').reduce((acc, item) => {
    const pair = item.split('=');
    acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    return acc;
  }, {} as {[key: string]: string});
  const pageStr = params['page'];
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const id = params['id'];
  let list;
  let view;
  switch (splitPath[0]) {
    case '':
    case 'new':
    case 'ask':
    case 'show':
    case 'jobs':
    case 'favorites':
      switch (splitPath[0]) {
        case '':
          list = 'news';
          break;
        case 'new':
          list = 'newest';
          break;
        case 'ask':
        case 'show':
        case 'jobs':
        case 'favorites':
          list = splitPath[0];
      }
      view = 'list';
      import('../components/hn-list.js').then(module => {
        const state = getState();
        dispatch(module.fetchListIfNeeded(
          module.currentListSelector(state),
          page
        ));
      });
      break;
    case 'user':
      view = 'user';
      import('../components/hn-user.js').then(module => {
        const state = getState();
        dispatch(module.fetchUserIfNeeded(
          module.currentUserSelector(state)
        ));
      });
      break;
    case 'item':
      view = 'item';
      import('../components/hn-item.js').then(module => {
        const state = getState();
        dispatch(module.fetchItemIfNeeded(
          module.currentItemSelector(state)
        ));
      });
      break;
    default:
      view = 'invalid-page';
      import('../components/hn-invalid-page.js');
  }

  dispatch({
    type: UPDATE_LOCATION,
    view,
    list,
    page,
    id
  });
};
