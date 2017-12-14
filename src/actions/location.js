import { pageSelector } from '../reducers/location.js';

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (location) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_LOCATION,
    location
  });

  // NOTE: The below actions need to be created with the updated state (i.e. the state
  // with the new location.path), so they cannot be combined with UPDATE_LOCATION.
  switch (pageSelector(getState())) {
    case 'list':
      import('../components/hn-list.js').then(module => {
        dispatch(module.fetchListIfNeeded(module.currentListSelector(getState())));
      });
      break;
    case 'user':
      import('../components/hn-user.js').then(module => {
        dispatch(module.fetchUserIfNeeded(module.currentUserSelector(getState())));
      });
      break;
    case 'item':
      import('../components/hn-item.js').then(module => {
        dispatch(module.fetchItemIfNeeded(module.currentItemSelector(getState())));
      });
      break;
    case 'invalid-page':
      import('../components/hn-invalid-page.js');
      break;
  }
};
