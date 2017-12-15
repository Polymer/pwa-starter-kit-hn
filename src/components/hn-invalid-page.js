import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { sharedStyles } from './shared-styles.js';

export class HnInvalidPageElement extends PolymerElement {
  static get template() {
    return `
    ${sharedStyles}
    <h1>Page not found</h1>`;
  }
}

customElements.define('hn-invalid-page', HnInvalidPageElement);
