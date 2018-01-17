import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { repeat } from '../../node_modules/lit-html/lib/repeat.js';
import { unsafeHTML } from '../../node_modules/lit-html/lib/unsafe-html.js';
import { sharedStyles } from './shared-styles.js';

export class HnCommentElement extends LitElement {
  render(props) {
    let comment = props.comment || {};
    let comments = comment.comments || [];
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
        [${props.collapsed ? `+${this._calculateThreadSize(comment)}` : '-'}]
      </button>
      <a class="user" href$="${this._getUserHref(comment)}">${comment.user}</a>
      <a href$="${this._getCommentHref(comment, props.itemId)}">${comment.time_ago}</a></div>
    </div>
    <div class="content" hidden="${props.collapsed}">
      <div>${unsafeHTML(comment.content)}</div>
      <div class="indent">
        ${repeat(comments, (comment) => html`
          <hn-comment id$="${comment.id}" comment="${comment}" itemId="${props.itemId}"></hn-comment>
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

  _getUserHref(comment) {
    return comment ? `/user?id=${comment.user}` : null;
  }

  _getCommentHref(comment, itemId) {
    return comment ? `/item?id=${itemId}#${comment.id}`: null;
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
