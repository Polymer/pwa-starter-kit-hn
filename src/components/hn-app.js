import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
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

export class HnAppElement extends connect(store)(LitElement) {
  render(props) {
    return html`
    <style>${sharedStyles}</style>
    <style>
      [page] > * {
        display: none;
        padding: 0 16px;
      }
      [page=list] hn-list,
      [page=item] hn-item,
      [page=user] hn-user,
      [page=invalid-page] hn-invalid-page {
        display: block;
      }
    </style>
    <div page$="${props.page}">
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
    this.page = pageSelector(state);
  }
}

customElements.define('hn-app', HnAppElement);
