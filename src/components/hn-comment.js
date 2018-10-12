/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { sharedStyles } from './shared-styles.js';

export class HnCommentElement extends LitElement {
  render() {
    const comment = this.comment || {};
    const comments = comment.comments || [];
    return html`
    ${sharedStyles}
    <style>
      .indent {
        margin-left: 18px;
      }
      .info {
        margin-bottom: 12px;
        color: #555;
      }
      .collapsed-btn, .user {
        margin-right: 4px;
      }
      .content {
        margin-left: 18px;
        overflow-wrap: break-word;
      }
      .content pre {
        white-space: pre-line;
      }
    </style>
    <div class="info">
      <button class="collapsed-btn" @click="${this._toggleCollapsed}">
        [${this._collapsed ? `+${this._calculateThreadSize(comment)}` : '-'}]
      </button>
      <a class="user" href="${`/user?id=${comment.user}`}">${comment.user}</a>
      ${comment.time_ago}
    </div>
    <div class="content" ?hidden="${this._collapsed}">
      <div>${unsafeHTML(comment.content)}</div>
      <div class="indent">
        ${repeat(comments, (comment) => html`
          <hn-comment .comment="${comment}"></hn-comment>
        `)}
      </div>
    </div>`;
  }

  static get properties() {
    return {
      comment: { type: Object },

      _collapsed: { type: Boolean }
    };
  }

  _toggleCollapsed() {
    this._collapsed = !this._collapsed;
  }

  _calculateThreadSize(comment) {
    let threadSize = 0;
    let flat = (comment) => {
      threadSize++;
      comment.comments.forEach(flat);
    };
    flat(comment);
    return threadSize;
  }
}

// This element registers itself because its recursive - its template depends
// on its registered tag name.
customElements.define('hn-comment', HnCommentElement);
