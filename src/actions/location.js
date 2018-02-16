/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { pageSelector } from '../reducers/location.js';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (location) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_LOCATION,
    location
  });
	
  // NOTE: The below actions need to be created with the updated state (i.e. the state	
  // with the new location.path).
  const state = getState();
  switch (pageSelector(state)) {
    case 'list':
      import('../components/hn-list.js').then(module => {
        const state = getState();
        dispatch(module.fetchListIfNeeded(
          module.currentListSelector(state),
          module.pageParamSelector(state)
        ));
      });
      break;
    case 'user':
      import('../components/hn-user.js').then(module => {
        const state = getState();
        dispatch(module.fetchUserIfNeeded(
          module.currentUserSelector(state)
        ));
      });
      break;
    case 'item':
      import('../components/hn-item.js').then(module => {
        const state = getState();
        dispatch(module.fetchItemIfNeeded(
          module.currentItemSelector(state)
        ));
      });
      break;
    case 'invalid-page':
      import('../components/hn-invalid-page.js');
      break;
  }
};
