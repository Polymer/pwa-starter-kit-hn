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
import { updateLocation } from '../actions/app.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';

export class HnAppElement extends connect(store)(LitElement) {
  render({ view }) {
    return html`
    <style>${sharedStyles}</style>
    <style>
      [view] > * {
        display: none;
        padding: 0 16px;
      }
      [view=list] hn-list,
      [view=item] hn-item,
      [view=user] hn-user,
      [view=invalid-page] hn-invalid-page {
        display: block;
      }
    </style>
    <div view$="${view}">
      <hn-list></hn-list>
      <hn-item></hn-item>
      <hn-user></hn-user>
      <hn-invalid-page></hn-invalid-page>
    </div>`;
  }

  static get properties() {
    return {
      view: String
    };
  }

  ready() {
    super.ready();

    installRouter((location) => store.dispatch(updateLocation(location)));
  }

  stateChanged(state) {
    this.view = state.app.view;
  }
}

customElements.define('hn-app', HnAppElement);
