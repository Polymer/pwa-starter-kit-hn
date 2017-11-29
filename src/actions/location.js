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
      Promise.all([
        import('../elements/hn-list-element.js'),
        import('./lists.js'),
        import('../reducers/lists.js')
      ]).then(modules => {
        dispatch(modules[1].fetchList(modules[2].currentListSelector(getState())));
      });
      break;
    case 'user':
      Promise.all([
        import('../elements/hn-user-element.js'),
        import('./users.js'),
        import('../reducers/users.js')
      ]).then(modules => {
        dispatch(modules[1].fetchUser(modules[2].currentUserSelector(getState())));
      });
      break;
  }
};

export const pushState = (href) => (dispatch) => {
  window.history.pushState({}, '', href);
  dispatch(updateLocation(window.location));
};

export const replaceState = (href) => (dispatch) => {
  window.history.replaceState({}, '', href);
  dispatch(updateLocation(window.location));
};
