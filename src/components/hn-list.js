import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';
import lists, { currentItemsSelector, currentListSelector } from '../reducers/lists.js';
import { pageParamSelector } from '../reducers/location.js';
import items from '../reducers/items.js';
import favorites from '../reducers/favorites.js';
import { store } from '../store.js';
import './hn-summary.js';
import { fetchList } from '../actions/lists.js';
import { loadFavorites } from '../actions/favorites.js';
import { connect } from '../../lib/connect-mixin.js';
import { sharedStyles } from './shared-styles.js';

store.addReducers({
  lists,
  favorites,
  items
});

store.dispatch(loadFavorites());

export class HnListElement extends connect(store)(LitElement) {
  render(props) {
    let items = props.items || [];
    return html`
    <style>${sharedStyles}</style>
    <button class="reload-btn" on-click="${() => this._reload()}">Reload</button>
    ${repeat(items, (item) => html`
      <hn-summary item="${item}" isFavorite="${this._isFavorite(props.favorites, item)}"></hn-summary>
    `)}
    <a href$="${this._getPreviousPageHref(props.page)}">Previous Page</a>
    <a href$="${this._getNextPageHref(props.page)}">Next Page</a>
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

  update(state) {
    const list = currentListSelector(state);
    if (list) {
      document.title = list.id;
      this.favorites = state.favorites;
      this.list = list;
      this.page = pageParamSelector(state);
      const items = currentItemsSelector(state);
      if (items) {
        this.items = items;
      }
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }

  _reload() {
    store.dispatch(fetchList(this.list, this.page));
  }

  _getPreviousPageHref(page) {
    return page > 1 ? `?page=${page-1}` : null;
  }

  _getNextPageHref(page) {
    return `?page=${page+1}`;
  }
}

customElements.define('hn-list', HnListElement);

export { currentListSelector, fetchList, pageParamSelector };
