import { updateLocation, pushState } from '../actions/location.js';
import location from '../reducers/location.js';
import { store } from './store.js';

store.addReducers({
  location,
});

document.body.addEventListener('click', e => {
  if ((e.button !== 0) || (e.metaKey || e.ctrlKey)) {
    return;
  }
  let origin;
  if (window.location.origin) {
    origin = window.location.origin;
  } else {
    origin = window.location.protocol + '//' + window.location.host;
  }
  let anchor = e.composedPath().filter(n=>n.localName=='a')[0];
  if (anchor && anchor.href.indexOf(origin) === 0) {
    e.preventDefault();
    store.dispatch(pushState(anchor.href));
  }
});

function handleUrlChange() {
  store.dispatch(updateLocation(window.location));
}
window.addEventListener('popstate', handleUrlChange);
handleUrlChange();
