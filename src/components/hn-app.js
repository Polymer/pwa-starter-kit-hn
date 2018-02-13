/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { connect } from '../../node_modules/pwa-helpers/connect-mixin.js';
import { installRouter } from '../../node_modules/pwa-helpers/router.js'
import { updateLocation } from '../actions/location.js';
import { pageSelector } from '../reducers/location.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';

export class HnAppElement extends connect(store)(LitElement) {
  render({ page }) {
    return html`
    <style>${sharedStyles}</style>
    <style>
      [page] > * {
        display: none;
        box-sizing: border-box;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 16px;
      }
      [page=list] hn-list,
      [page=item] hn-item,
      [page=user] hn-user,
      [page=invalid-page] hn-invalid-page {
        display: block;
      }
    </style>
    <div page$="${page}">
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

  ready() {
    super.ready();

    installRouter(() => store.dispatch(updateLocation(window.location)));
  }

  stateChanged(state) {
    this.page = pageSelector(state);
  }
}

customElements.define('hn-app', HnAppElement);
