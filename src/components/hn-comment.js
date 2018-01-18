import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';
import { unsafeHTML } from '../../node_modules/lit-html/lib/unsafe-html.js';
import { sharedStyles } from './shared-styles.js';

export class HnCommentElement extends LitElement {
  render({ collapsed, comment = {}, itemId }) {
    const comments = comment.comments || [];
    return html`
    <style>${sharedStyles}</style>
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
      <button class="collapsed-btn" on-click="${() => this._toggleCollapsed()}">
        [${collapsed ? `+${this._calculateThreadSize(comment)}` : '-'}]
      </button>
      <a class="user" href="${`/user?id=${comment.user}`}">${comment.user}</a>
      <a href="${`/item?id=${itemId}#${comment.id}`}">${comment.time_ago}</a></div>
    </div>
    <div class="content" hidden="${collapsed}">
      <div>${unsafeHTML(comment.content)}</div>
      <div class="indent">
        ${repeat(comments, (comment) => html`
          <hn-comment id="${comment.id}" comment="${comment}" itemId="${itemId}"></hn-comment>
        `)}
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      comment: Object,

      itemId: String,

      collapsed: Boolean
    }
  }

  _toggleCollapsed() {
    this.collapsed = !this.collapsed;
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
