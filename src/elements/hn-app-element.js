import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { store } from '../store.js';
import { pageSelector } from '../reducers/location.js';

export class HnAppElement extends PolymerElement {
  static get template() {
    return `
    <style>
      :host([page=list]) hn-user,
      :host([page=user]) hn-list {
        display: none;
      }
    </style>
    <a href="/">top</a>
    <a href="/new">new</a>
    <a href="/ask">ask</a>
    <a href="/show">show</a>
    <a href="/jobs">jobs</a>
    <hn-list></hn-list>
    <hn-user></hn-user>`;
  }
  
  static get properties() {
    return {
    }
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    this.setAttribute('page', pageSelector(state));
  }
}

customElements.define('hn-app', HnAppElement);
