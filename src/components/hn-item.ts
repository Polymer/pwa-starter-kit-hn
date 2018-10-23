/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, property } from '@polymer/lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect, updateMetadata } from 'pwa-helpers';
import { fetchItem, fetchItemIfNeeded } from '../actions/items.js';
import items, { currentItemSelector, ItemState } from '../reducers/items.js';
import { store, RootState } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';
import './hn-summary.js';
import './hn-comment.js';

store.addReducers({
  items
});

export class HnItemElement extends connect(store)(LitElement) {
  render() {
    const item = this._item || {};
    const comments = item.comments || [];
    return html`
    ${sharedStyles}
    <style>
      hn-summary {
        padding-bottom: 16px;
        border-bottom: 1px solid #e5e5e5;
      }
    </style>
    <hn-loading-button .loading="${item.isFetching}" @click="${this._reload}">
    </hn-loading-button>
    <div ?hidden="${item.failure}">
      <hn-summary .item="${item}"></hn-summary>
      <div ?hidden="${!item.content}">${unsafeHTML(item.content)}</div>
      ${repeat(comments, (comment) => html`
        <hn-comment .comment="${comment}"></hn-comment>
      `)}
    </div>
    ${item.failure ? html`<p>Item not found</p>` : null}`;
  }

  @property()
  private _item?: ItemState;

  _reload() {
    store.dispatch(fetchItem(this._item));
  }

  stateChanged(state: RootState) {
    const item = currentItemSelector(state);
    if (item) {
      updateMetadata({ title: item.title });
      this._item = item;
    }
  }
}

customElements.define('hn-item', HnItemElement);

export { currentItemSelector, fetchItemIfNeeded };
