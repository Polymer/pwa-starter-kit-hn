import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { store } from '../store.js';
import { saveFavorite, deleteFavorite } from '../actions/favorites.js';
import { sharedStyles } from './shared-styles.js';

export class HnSummaryElement extends LitElement {
  render(props) {
    let item = props.item || {};
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
      <a href="${this._getUserHref(item)}">${item.user}</a>
      ${item.time_ago}
      <span class="spacer">| </span>
      <a href="${this._getItemHref(item)}">${item.comments_count} comments</a>
      <span class="spacer"> | </span>
      <button class="add-to-favorites" hidden="${props.isFavorite}" on-click="${() => this._markItem()}">&#9829; Add to Favorites</button>
      <button hidden="${!props.isFavorite}" on-click="${() => this._unmarkItem()}">&#9829; Remove from Favorites</button>
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
    store.dispatch(saveFavorite(this.item));
  }

  _unmarkItem() {
    store.dispatch(deleteFavorite(this.item));
  }
}

customElements.define('hn-summary', HnSummaryElement);
