import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { store } from '../store.js';
import { addFavorite, removeFavorite } from '../actions/favorites.js';

export class HnSummaryElement extends PolymerElement {
  static get template() {
    return `
    <style>
      :host {
        display: block;
        margin: 1em 0;
      }
    </style>
    <a href$="[[item.url]]">[[item.title]]</a>
    <span class="domain">([[item.domain]])</span>
    <div class="info">
      [[item.points]] points by
      <a href$="[[_getUserHref(item)]]">[[item.user]]</a>
      [[item.time_ago]]
      <span class="spacer">|</span>
      <a href$="[[_getItemHref(item)]]">[[item.comments_count]] comments</a>
      <button hidden$="[[isFavorite]]" on-click="_markItem">Mark</button>
      <button hidden$="[[!isFavorite]]" on-click="_unmarkItem">Unmark</button>
    </div>
    `;
  }
  
  static get properties() {
    return {
      item: Object,

      isFavorite: Boolean
    }
  }
  
  _getItemHref(item) {
    return item && item.id ? `/item?id=${item.id}` : null;
  }

  _getUserHref(item) {
    return item && item.user ? `/user?id=${item.user}` : null;
  }

  _markItem() {
    store.dispatch(addFavorite(this.item));
  }

  _unmarkItem() {
    store.dispatch(removeFavorite(this.item));
  }
}

customElements.define('hn-summary', HnSummaryElement);
