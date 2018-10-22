/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, property } from '@polymer/lit-element';
import { connect, updateMetadata } from 'pwa-helpers';
import { fetchUser, fetchUserIfNeeded } from '../actions/users.js';
import users, { currentUserSelector, UserState } from '../reducers/users.js';
import { store, RootState } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';

store.addReducers({
  users,
});

export class HnUserElement extends connect(store)(LitElement) {
  render() {
    const user = this._user || {};
    return html`
    ${sharedStyles}
    <style>
      table {
        margin: 1em 0;
      }
    </style>
    <hn-loading-button .loading="${user.isFetching}" @click="${this._reload}">
    </hn-loading-button>
    <table ?hidden="${user.failure}">
      <tr>
        <td>User:</td>
        <td>${user.id}</td>
      </tr>
      <tr>
        <td>Created:</td>
        <td>${user.created}</td>
      </tr>
      <tr>
        <td>Karma:</td>
        <td>${user.karma}</td>
      </tr>
    </table>
    ${user.failure ? html`<p>User not found</p>` : null}`;
  }

  @property()
  private _user?: UserState;

  _reload() {
    store.dispatch(fetchUser(this._user));
  }

  stateChanged(state: RootState) {
    const user = currentUserSelector(state);
    if (user) {
      updateMetadata({ title: user.id });
      this._user = user;
    }
  }
}

customElements.define('hn-user', HnUserElement);

export { currentUserSelector, fetchUserIfNeeded };
