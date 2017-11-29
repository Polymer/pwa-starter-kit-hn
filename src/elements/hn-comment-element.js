import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

export class HnCommentElement extends PolymerElement {
  static get template() {
    return `
    <div>
      <button on-click="_toggleCollapsed">[–]</button>
      <a href$="[[_getUserHref(comment)]]">[[comment.user]]</a>
      <a href$="[[_getCommentHref(comment, itemId)]]">[[comment.time_ago]]</a></div>
    </div>
    <div hidden$="[[collapsed]]" inner-h-t-m-l="[[comment.content]]"></div>
    <blockquote hidden$="[[collapsed]]">
      <dom-repeat items="[[comment.comments]]" as="comment">
        <template>
          <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[itemId]]"></hn-comment>
        </template>
      </dom-repeat>
    </blockquote>
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
    return comment ? `/user/${comment.user}` : null;
  }

  _getCommentHref(comment, itemId) {
    return comment ? `/item/${itemId}#${comment.id}`: null;
  }
}

// This element registers itself because its recursive - its template depends
// on its registered tag name.
customElements.define('hn-comment', HnCommentElement);
