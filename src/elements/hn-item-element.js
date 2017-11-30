import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import { currentItemSelector } from '../reducers/items.js';
import { store } from '../store.js';
import './hn-summary-element.js';
import './hn-comment-element.js';

export class HnItemElement extends PolymerElement {
  static get template() {
    return `
    <h1>Item View</h1>
    <hn-summary item="[[item]]"></hn-summary>
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
}
