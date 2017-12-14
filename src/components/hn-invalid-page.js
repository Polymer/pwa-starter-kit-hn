import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';

export class HnInvalidPageElement extends PolymerElement {
  static get template() {
    return `
    <h1>Page not found</h1>`;
  }
}

customElements.define('hn-invalid-page', HnInvalidPageElement);
