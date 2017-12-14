import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import location, { pageSelector } from '../reducers/location.js';
import { store } from '../store.js';
import { updateLocation, pushState } from '../actions/location.js';

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

export class HnAppElement extends PolymerElement {
  static get template() {
    return `
    <style>
      [page] > * {
        display: none;
      }
      [page=list] hn-list,
      [page=item] hn-item,
      [page=user] hn-user,
      [page=invalid-page] hn-invalid-page {
        display: block;
      }
    </style>
    <a href="/">top</a>
    <a href="/new">new</a>
    <a href="/ask">ask</a>
    <a href="/show">show</a>
    <a href="/jobs">jobs</a>
    <a href="/favorites">favorites</a>
    <div page$="[[page]]">
      <hn-list></hn-list>
      <hn-item></hn-item>
      <hn-user></hn-user>
      <hn-invalid-page></hn-invalid-page>
    </div>`;
  }
  
  static get properties() {
    return {
      page: String
    };
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    this.setProperties({
      page: pageSelector(state)
    });
  }
}

customElements.define('hn-app', HnAppElement);
