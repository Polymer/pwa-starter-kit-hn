import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemsSelector, currentListSelector } from '../reducers/lists.js';
import { store } from '../modules/store.js';
import '../modules/lists.js';
import '../modules/items.js';
import './hn-summary-element.js';
import { fetchList, fetchListIfNeeded } from '../actions/lists.js';

export class HnListElement extends PolymerElement {
  static get template() {
    return `
    <h1>List View</h1>
    <button on-click="_reload">Reload</button>
    <dom-repeat items="[[items]]">
      <template>
        <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      </template>
    </dom-repeat>
    `;
  }
  
  static get properties() {
    return {
      list: Object,

      favorites: Object,

      items: Array
    }
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    const list = currentListSelector(state);
    const items = currentItemsSelector(state);
    if (items) {
      this.setProperties({
        favorites: state.favorites,
        list,
        items
      });
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }
  
  _reload() {
    store.dispatch(fetchList(this.list));
  }
}

customElements.define('hn-list', HnListElement);

export { currentListSelector, fetchListIfNeeded };
