/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { fetchUser, fetchUserIfNeeded } from '../actions/users.js';
import users, { currentUserSelector } from '../reducers/users.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';

store.addReducers({
  users,
});

export class HnUserElement extends connect(store)(LitElement) {
  render({ _user }) {
    return html`
    ${sharedStyles}
    <style>
      table {
        margin: 1em 0;
      }
    </style>
    <hn-loading-button
        loading="${_user.isFetching}"
        on-click="${() => store.dispatch(fetchUser(_user))}">
    </hn-loading-button>
    <table hidden="${_user.failure}">
      <tr>
        <td>User:</td><td>${_user.id}</td>
      </tr>
      <tr>
        <td>Created:</td><td>${_user.created}</td>
      </tr>
      <tr>
        <td>Karma:</td><td>${_user.karma}</td>
      </tr>
    </table>
    ${_user.failure ? html`<p>User not found</p>` : ''}
    `;
  }

  static get properties() {
    return {
      _user: Object
    }
  }

  stateChanged(state) {
    const user = currentUserSelector(state);
    if (user) {
      updateMetadata({ title: user.id });
      this._user = user;
    }
  }
}

customElements.define('hn-user', HnUserElement);

export { currentUserSelector, fetchUserIfNeeded };
