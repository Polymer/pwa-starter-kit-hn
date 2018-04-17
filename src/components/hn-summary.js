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
import { saveFavorite, deleteFavorite } from '../actions/favorites.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';

export class HnSummaryElement extends LitElement {
  render({ isFavorite, item = {} }) {
    return html`
    ${sharedStyles}
    <style>
      :host {
        display: block;
        padding: 16px;
        border-bottom: 1px solid #e5e5e5;
        background-color: #ffffff;
      }
      :host(:last-of-type) {
        border-bottom: none;
      }
      .title {
        font-size: 1.2em;
        text-decoration: none;
      }
      .domain {
        padding-left: 4px;
        color: #717171;
      }
      .info {
        padding-top: 4px;
        color: #717171;
      }
      .add-to-favorites {
        color: #cccccc;
      }
    </style>
    <a class="title" href="${item.url}">${item.title}</a>
    <span class="domain" hidden="${!item.domain}">(${item.domain})</span>
    <div class="info">
      ${item.points} points by
      <a href="${`/user?id=${item.user}`}">${item.user}</a>
      ${item.time_ago}
      <span class="spacer">| </span>
      <a href="${`/item?id=${item.id}`}">${item.comments_count} comments</a>
      <span class="spacer"> | </span>
      <button class="add-to-favorites" hidden="${isFavorite}" on-click="${() => store.dispatch(saveFavorite(this.item))}">
        &#9829; Add to Favorites
      </button>
      <button hidden="${!isFavorite}" on-click="${() => store.dispatch(deleteFavorite(this.item))}">
        &#9829; Remove from Favorites
      </button>
    </div>
    `;
  }

  static get properties() {
    return {
      item: Object,

      isFavorite: Boolean
    }
  }
}

customElements.define('hn-summary', HnSummaryElement);
