import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import items, { currentItemSelector } from '../reducers/items.js';
import favorites from '../reducers/favorites.js';
import { store } from '../store.js';
import './hn-summary.js';
import './hn-comment.js';
import { fetchItem, fetchItemIfNeeded } from '../actions/items.js';
import { loadFavorites } from '../actions/favorites.js';
import { connect } from '../../lib/connect-mixin.js';
import { sharedStyles } from './shared-styles.js';

store.addReducers({
  favorites,
  items
});

store.dispatch(loadFavorites());

export class HnItemElement extends connect(store)(PolymerElement) {
  static get template() {
    return `
    ${sharedStyles}
    <button on-click="_reload">Reload</button>
    <div hidden$="[[item.failure]]">
      <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      <div hidden$="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>
      <dom-repeat items="[[item.comments]]" as="comment">
        <template>
          <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[item.id]]"></hn-comment>
        </template>
      </dom-repeat>
    </div>
    <dom-if if="[[item.failure]]">
      <template>
        <p>Item not found</p>
      </template>
    </dom-if>`;
  }
  
  static get properties() {
    return {
      item: Object
    }
  }

  update(state) {
    const item = currentItemSelector(state);
    if (item) {
      document.title = item.title;
      this.setProperties({
        favorites: state.favorites,
        item
      });
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }
  
  _reload() {
    store.dispatch(fetchItem(this.item));
  }
}

customElements.define('hn-item', HnItemElement);

export { currentItemSelector, fetchItemIfNeeded };
