import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemsSelector } from '../reducers/lists.js';
import { store } from '../store.js';
import './hn-summary-element.js';

export class HnListElement extends PolymerElement {
  static get template() {
    return `
    <h1>List View</h1>
    <dom-repeat items="[[items]]">
      <template>
        <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      </template>
    </dom-repeat>
    `;
  }
  
  static get properties() {
    return {
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
    const items = currentItemsSelector(state);
    if (items) {
      this.setProperties({
        favorites: state.favorites,
        items
      });
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }
}
