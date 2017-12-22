import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
/* Always load dom-if here for more efficient caching */
import '../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import './hn-invalid-page.js';
import location, { pageSelector } from '../reducers/location.js';
import { store } from '../store.js';
import { updateLocation } from '../actions/location.js';
import { connect } from '../../lib/connect-mixin.js';
import { installRouter } from '../../lib/router.js';
import { sharedStyles } from './shared-styles.js';

store.addReducers({
  location,
});

installRouter(() => store.dispatch(updateLocation(window.location)));

export class HnAppElement extends connect(store)(PolymerElement) {
  static get template() {
    return `
    ${sharedStyles}
    <style>
      header {
        margin: 1em 0;
      }
      header a {
        padding: 4px;
        border: 2px solid;
        border-bottom: none;
      }
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
    <header>
      <a href="/">top</a>
      <a href="/new">new</a>
      <a href="/ask">ask</a>
      <a href="/show">show</a>
      <a href="/jobs">jobs</a>
      <a href="/favorites">favorites</a>
    </header>
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

  update(state) {
    this.setProperties({
      page: pageSelector(state)
    });
  }
}

customElements.define('hn-app', HnAppElement);
