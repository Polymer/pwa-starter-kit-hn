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
import { store } from '../store.js';
import { saveFavorite, deleteFavorite } from '../actions/favorites.js';
import { sharedStyles } from './shared-styles.js';

export class HnSummaryElement extends LitElement {
  render({ isFavorite, item = {} }) {
    return html`
    <style>${sharedStyles}</style>
    <style>
      :host {
        display: block;
        margin: 16px 0;
      }
      .title {
        font-size: 1.2em;
        font-weight: 500;
      }
      .domain {
        padding-left: 4px;
        color: #555;
      }
      .info {
        padding-top: 4px;
        color: #555;
      }
      .add-to-favorites {
        color: #ccc;
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
