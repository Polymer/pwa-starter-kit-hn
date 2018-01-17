import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { sharedStyles } from './shared-styles.js';

export class HnInvalidPageElement extends LitElement {
  render(props) {
    return html`
    <style>${sharedStyles}</style>
    <h1>Page not found</h1>`;
  }
}

customElements.define('hn-invalid-page', HnInvalidPageElement);
