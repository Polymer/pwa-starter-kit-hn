import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemSelector } from '../reducers/items.js';
import { store } from '../modules/store.js';
import '../modules/items.js';
import './hn-summary-element.js';
import './hn-comment-element.js';
import { fetchItem } from '../actions/items.js';

export class HnItemElement extends PolymerElement {
  static get template() {
    return `
    <h1>Item View</h1>
    <button on-click="_reload">Reload</button>
    <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
    <div hidden$="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>
    <dom-repeat items="[[item.comments]]" as="comment">
      <template>
        <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[item.id]]"></hn-comment>
      </template>
    </dom-repeat>
    `;
  }
  
  static get properties() {
    return {
      item: Object
    }
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    const item = currentItemSelector(state);
    if (item) {
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
