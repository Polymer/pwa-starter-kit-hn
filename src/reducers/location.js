import { UPDATE_LOCATION } from '../actions/location.js';
import { createSelector } from '../../node_modules/reselect/es/index.js';

const location = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const location = action.location;
      return {
        ...state,
        pathname: location.pathname,
        search: location.search,
        hash: location.hash
      };
    default:
      return state;
  }
}

export default location;

const pathnameSelector = state => state.location.pathname;

export const splitPathnameSelector = createSelector(
  pathnameSelector,
  pathname => {
    return pathname ? pathname.slice(1).split('/') : [];
  }
);

export const pageSelector = createSelector(
  splitPathnameSelector,
  splitPath => {
    switch (splitPath[0]) {
      case '':
      case 'new':
      case 'ask':
      case 'show':
      case 'jobs':
        return 'list';
      case 'user':
        return 'user';
      default:
        return null;
    }
  }
);
