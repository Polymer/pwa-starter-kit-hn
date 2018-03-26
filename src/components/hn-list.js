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
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';
import { connect } from '../../node_modules/pwa-helpers/connect-mixin.js';
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
  render({ favorites, items = [], list, page }) {
    const pages = list.pages;
    const loading = pages && pages[page] && pages[page].isFetching;
    return html`
    ${sharedStyles}
    <style>
      :host > a {
        display: inline-block;
        margin: 0 8px 8px 0;
      }
    </style>
    ${
      list.id !== 'favorites' ?
      html`
        <hn-loading-button
            loading="${loading}"
            on-click="${() => store.dispatch(fetchList(list, page))}">
        </hn-loading-button>
      ` :
      null
    }
    ${repeat(items, (item) => html`
      <hn-summary
          item="${item}"
          isFavorite="${favorites && item && favorites[item.id]}">
      </hn-summary>
    `)}
    ${
      list.id !== 'favorites' && items.length ?
      html`
        <a href="${`?page=${Math.max(page-1, 1)}`}">Previous Page</a>
        <a href="${`?page=${page+1}`}">Next Page</a>
      ` :
      null
    }
    `;
  }

  static get properties() {
    return {
      list: Object,

      favorites: Object,

      items: Array,

      page: Number
    }
  }

  stateChanged(state) {
    const list = currentListSelector(state);
    if (list) {
      document.title = list.id;
      document.body.setAttribute('list', list.id);
      this.favorites = state.favorites;
      this.list = list;
      this.page = state.app.page;
      const items = currentItemsSelector(state);
      if (items) {
        this.items = items;
      }
    }
  }
}

customElements.define('hn-list', HnListElement);

export { currentListSelector, fetchListIfNeeded };
