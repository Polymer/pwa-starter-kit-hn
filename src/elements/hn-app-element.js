import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { store } from '../store.js';
import { pageSelector } from '../reducers/location.js';

export class HnAppElement extends PolymerElement {
  static get template() {
    return `
    <style>
      [page] > * {
        display: none;
      }
      [page=list] hn-list,
      [page=item] hn-item,
      [page=user] hn-user {
        display: block;
      }
    </style>
    <a href="/">top</a>
    <a href="/new">new</a>
    <a href="/ask">ask</a>
    <a href="/show">show</a>
    <a href="/jobs">jobs</a>
    <div page$="[[page]]">
      <hn-list></hn-list>
      <hn-item></hn-item>
      <hn-user></hn-user>
    </div>`;
  }
  
  static get properties() {
    return {
      page: String
    };
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    this.setProperties({
      page: pageSelector(state)
    });
  }
}
