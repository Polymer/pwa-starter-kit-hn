/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, property } from '@polymer/lit-element';

export class HnLoadingButton extends LitElement {
  render() {
    const loading = this.loading;
    return html`
    <style>
      button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        background: #333;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
      }
      button[disabled] {
        opacity: 0.5;
      }
      svg {
        fill: #FFF;
      }
      button[disabled] svg {
        animation: spin 1s infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
      }
    </style>
    <button ?disabled="${loading}" title="Refresh content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>`;
  }

  @property()
  loading: boolean|undefined;
}

customElements.define('hn-loading-button', HnLoadingButton);
