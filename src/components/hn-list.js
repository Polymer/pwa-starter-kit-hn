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
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { fetchList, fetchListIfNeeded } from '../actions/lists.js';
import { loadFavorites } from '../actions/favorites.js';
import lists, { currentItemsSelector, currentListSelector } from '../reducers/lists.js';
import items from '../reducers/items.js';
import favorites from '../reducers/favorites.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';
import './hn-summary.js';

store.addReducers({
  lists,
  favorites,
  items
});

store.dispatch(loadFavorites());

export class HnListElement extends connect(store)(LitElement) {
  render({ _favorites, _items = [], _list, _page }) {
    const pages = _list.pages;
    const loading = pages && pages[_page] && pages[_page].isFetching;
    return html`
    ${sharedStyles}
    <style>
      :host > a {
        display: inline-block;
        margin: 0 8px 8px 0;
      }
      .pagination {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 16px 0;
      }
      .pagination > a:first-of-type {
        margin-right: 16px;
      }
    </style>
    ${
      _list.id !== 'favorites' ?
      html`
        <hn-loading-button
            loading="${loading}"
            on-click="${() => store.dispatch(fetchList(_list, _page))}">
        </hn-loading-button>
      ` :
      null
    }
    ${repeat(_items, (item) => html`
      <hn-summary
          item="${item}"
          isFavorite="${_favorites && item && _favorites[item.id]}">
      </hn-summary>
    `)}
    ${
      _list.id !== 'favorites' && _items.length ?
      html`
        <div class="pagination">
          <a href="${`?page=${Math.max(_page-1, 1)}`}">Previous Page</a>
          <a href="${`?page=${_page+1}`}">Next Page</a>
        </div>
      ` :
      null
    }
    `;
  }

  static get properties() {
    return {
      _list: Object,

      _favorites: Object,

      _items: Array,

      _page: Number
    }
  }

  stateChanged(state) {
    const list = currentListSelector(state);
    if (list) {
      updateMetadata({ title: list.id });
      document.body.setAttribute('list', list.id);
      this._favorites = state.favorites;
      this._list = list;
      this._page = state.app.page;
      const items = currentItemsSelector(state);
      if (items) {
        this._items = items;
      }
    }
  }
}

customElements.define('hn-list', HnListElement);

export { currentListSelector, fetchListIfNeeded };
