/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, css, property } from 'lit-element';
import { connect, installRouter } from 'pwa-helpers';
import { updateLocation } from '../actions/app.js';
import { store, RootState } from '../store.js';
import { sharedStyles } from './shared-styles.js';

export class HnAppElement extends connect(store)(LitElement) {
  static get styles() {
    return [
      sharedStyles,
      css`
      [view] > * {
        display: none;
        padding: 0 16px;
      }
      [view=list] hn-list,
      [view=item] hn-item,
      [view=user] hn-user,
      [view=invalid-page] hn-invalid-page {
        display: block;
      }`
    ];
  }

  render() {
    return html`
    <div view="${this._view}">
      <hn-list></hn-list>
      <hn-item></hn-item>
      <hn-user></hn-user>
      <hn-invalid-page></hn-invalid-page>
    </div>`;
  }

  @property()
  private _view?: string;

  firstUpdated() {
    installRouter((location, event) => {
      // Only scroll to top on link clicks, not popstate events.
      if (event && event.type === 'click') {
        window.scrollTo(0, 0);
      }
      store.dispatch(updateLocation(location));
    });
  }

  stateChanged(state: RootState) {
    this._view = state.app.view;
  }
}

customElements.define('hn-app', HnAppElement);
