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
import { repeat } from 'lit-html/lib/repeat.js';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { fetchItem, fetchItemIfNeeded } from '../actions/items.js';
import { loadFavorites } from '../actions/favorites.js';
import items, { currentItemSelector } from '../reducers/items.js';
import favorites from '../reducers/favorites.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';
import './hn-summary.js';
import './hn-comment.js';

store.addReducers({
  favorites,
  items
});

store.dispatch(loadFavorites());

export class HnItemElement extends connect(store)(LitElement) {
  render({ _favorites, _item }) {
    const comments = _item.comments || [];
    return html`
    ${sharedStyles}
    <style>
      hn-summary,
      .content,
      hn-comment {
        padding: 16px;
        border-bottom: 1px solid #eeeeee;
        background-color: #ffffff;
      }
    </style>
    <hn-loading-button
        loading="${_item.isFetching}"
        on-click="${() => store.dispatch(fetchItem(_item))}">
    </hn-loading-button>
    <div hidden="${_item.failure}">
      <hn-summary
          item="${_item}"
          isFavorite="${_favorites && _item && _favorites[_item.id]}">
      </hn-summary>
      <div class="content" hidden="${!_item.content}">${unsafeHTML(_item.content)}</div>
      ${repeat(comments, (comment) => html`
        <hn-comment comment="${comment}" itemId="${_item.id}"></hn-comment>
      `)}
    </div>
    ${_item.failure ? html`<p>Item not found</p>` : ''}
    `;
  }

  static get properties() {
    return {
      _item: Object,

      _favorites: Array
    }
  }

  stateChanged(state) {
    const item = currentItemSelector(state);
    if (item) {
      updateMetadata({ title: item.title });
      this._favorites = state.favorites;
      this._item = item;
    }
  }
}

customElements.define('hn-item', HnItemElement);

export { currentItemSelector, fetchItemIfNeeded };
