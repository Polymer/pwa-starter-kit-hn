import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import lists, { currentListSelector } from '../reducers/lists.js';
import { store } from '../store.js';

store.addReducers({
  lists,
});

export class HnListElement extends PolymerElement {
  static get template() {
    return `
    <h1>List View</h1>
    <dom-repeat items="[[_getItems(list)]]">
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
      list: Object
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
    this.setProperties({
      list
    });
  }

  _getItems(list) {
    return list && list.items ? Object.values(list.items) : null;
  }
  
  _getItemHref(item) {
    return item && item.id ? `/item/${item.id}` : null;
  }

  _getItemUserHref(item) {
    return item && item.user ? `/user/${item.user}` : null;
  }
}

customElements.define('hn-list', HnListElement);
