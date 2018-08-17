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
import { repeat } from 'lit-html/directives/repeat.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect, updateMetadata } from 'pwa-helpers';
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
  render() {
    const { _favorites, _item } = this;
    const comments = _item.comments || [];
    return html`
    ${sharedStyles}
    <style>
      hn-summary {
        padding-bottom: 16px;
        border-bottom: 1px solid #e5e5e5;
      }
    </style>
    <hn-loading-button
        .loading="${_item.isFetching}"
        @click="${() => store.dispatch(fetchItem(_item))}">
    </hn-loading-button>
    <div ?hidden="${_item.failure}">
      <hn-summary
          .item="${_item}"
          .isFavorite="${_favorites && _item && _favorites[_item.id]}">
      </hn-summary>
      <div ?hidden="${!_item.content}">${unsafeHTML(_item.content)}</div>
      ${repeat(comments, (comment) => html`
        <hn-comment .comment="${comment}" .itemId="${_item.id}"></hn-comment>
      `)}
    </div>
    ${_item.failure ? html`<p>Item not found</p>` : ''}
    `;
  }

  static get properties() {
    return {
      _item: { type: Object },

      _favorites: { type: Array }
    }
  }

  _stateChanged(state) {
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
