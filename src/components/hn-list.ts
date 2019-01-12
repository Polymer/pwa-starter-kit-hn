/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { connect, updateMetadata } from 'pwa-helpers';
import { fetchList, fetchListIfNeeded } from '../actions/lists.js';
import lists, { currentItemsSelector, currentListSelector, ListState } from '../reducers/lists.js';
import items, { ItemState } from '../reducers/items.js';
import { store, RootState } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';
import './hn-summary.js';

store.addReducers({
  lists,
  items
});

export class HnListElement extends connect(store)(LitElement) {
  render() {
    const pathname = window.location.pathname;
    const items = this._items || [];
    const list = this._list || {};
    const pageNumber = this._page || 0;
    const pageStr = '' + pageNumber;
    const pages = list.pages;
    const loading = pages && pages[pageStr] && pages[pageStr].isFetching;
    return html`
    ${sharedStyles}
    <style>
      :host > a {
        display: inline-block;
        margin: 0 8px 8px 0;
      }
    </style>
    ${list.id !== 'favorites' ? html`
      <hn-loading-button .loading="${loading}" @click="${this._reload}">
      </hn-loading-button>
    ` : null}
    ${repeat(items, (item) => html`
      <hn-summary .item="${item}"></hn-summary>
    `)}
    ${list.id !== 'favorites' && items.length ? html`
      <a href="${`${pathname}?page=${Math.max(pageNumber-1, 1)}`}">Previous Page</a>
      <a href="${`${pathname}?page=${pageNumber+1}`}">Next Page</a>
    ` : null}`;
  }

  @property()
  private _list?: ListState;

  @property()
  private _items?: Array<ItemState>;

  @property()
  private _page?: number;

  _reload() {
    store.dispatch(fetchList(this._list, this._page));
  }

  stateChanged(state: RootState) {
    const list = currentListSelector(state);
    if (list) {
      updateMetadata({ title: list.id });
      document.body.setAttribute('list', list.id || '');
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
