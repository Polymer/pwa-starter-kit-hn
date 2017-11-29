import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemSelector } from '../reducers/items.js';
import { store } from '../store.js';
import './hn-comment-element.js';

export class HnItemElement extends PolymerElement {
  static get template() {
    return `
    <h1>Item View</h1>
    <div class="title">
      <a href$="[[item.url]]">[[item.title]]</a>
      <span class="domain">([[item.domain]])</span>
      <div class="info">
        [[item.points]] points by
        <a href$="[[_getUserHref(item)]]">[[item.user]]</a>
        [[item.time_ago]]
        <span class="spacer">|</span>
        <a href$="[[_getItemHref(item)]]">[[item.comments_count]] comments</a>
      </div>
    </div>
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
        item
      });
    }
  }
  
  _getItemHref(item) {
    return item && item.id ? `/item/${item.id}` : null;
  }

  _getUserHref(item) {
    return item && item.user ? `/user/${item.user}` : null;
  }
}
