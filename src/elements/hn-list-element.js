import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemsSelector } from '../reducers/lists.js';
import { store } from '../store.js';

export class HnListElement extends PolymerElement {
  static get template() {
    return `
    <h1>List View</h1>
    <dom-repeat items="[[items]]">
      <template>
        <div>
          <span class="index">[[index]]</span>
          <div class="title">
            <a href$="[[item.url]]">[[item.title]]</a>
            <span class="domain">([[item.domain]])</span>
            <div class="info">
              [[item.points]] points by
              <a href$="[[_getItemUserHref(item)]]">[[item.user]]</a>
              [[item.time_ago]]
              <span class="spacer">|</span>
              <a href="[[_getItemHref(item)]]">[[item.comments_count]] comments</a>
            </div>
          </div>
        </div>
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
        items
      });
    }
  }
  
  _getItemHref(item) {
    return item && item.id ? `/item?id=${item.id}` : null;
  }

  _getItemUserHref(item) {
    return item && item.user ? `/user?id=${item.user}` : null;
  }
}
