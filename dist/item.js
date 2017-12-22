webpackJsonp([3],{39:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(4),e=c(18),f=c(42),g=c(43),h=c(44),i=c(15),j=c(47),k=c(51),l=c(46),m=c(41),n=c(17),o=c(6);c.d(b,"currentItemSelector",function(){return g.a}),c.d(b,"fetchItemIfNeeded",function(){return l.e}),i.a.addReducers({favorites:h.a,items:g.b}),i.a.dispatch(Object(m.d)());class p extends Object(n.a)(i.a)(d.a){static get template(){return`
    ${o.a}
    <button on-click="_reload">Reload</button>
    <div hidden$="[[item.failure]]">
      <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      <div hidden$="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>
      <dom-repeat items="[[item.comments]]" as="comment">
        <template>
          <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[item.id]]"></hn-comment>
        </template>
      </dom-repeat>
    </div>
    <dom-if if="[[item.failure]]">
      <template>
        <p>Item not found</p>
      </template>
    </dom-if>`}static get properties(){return{item:Object}}update(a){const b=Object(g.a)(a);b&&(document.title=b.title,this.setProperties({favorites:a.favorites,item:b}))}_isFavorite(a,b){return!!(a&&b&&a[b.id])}_reload(){i.a.dispatch(Object(l.d)(this.item))}}b.HnItemElement=p,customElements.define("hn-item",p)},51:function(a,b,c){"use strict";var d=c(4),e=c(42),f=c(6);class g extends d.a{static get template(){return`
    ${f.a}
    <style>
      .indent {
        margin-left: 36px;
      }
    </style>
    <div>
      <button on-click="_toggleCollapsed">[–]</button>
      <a href$="[[_getUserHref(comment)]]">[[comment.user]]</a>
      <a href$="[[_getCommentHref(comment, itemId)]]">[[comment.time_ago]]</a></div>
    </div>
    <div hidden$="[[collapsed]]">
      <div inner-h-t-m-l="[[comment.content]]"></div>
      <div class="indent">
        <dom-repeat items="[[comment.comments]]" as="comment">
          <template>
            <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[itemId]]"></hn-comment>
          </template>
        </dom-repeat>
      </div>
    </div>
    `}static get properties(){return{comment:Object,itemId:String,collapsed:Boolean}}_toggleCollapsed(){this.collapsed=!this.collapsed}_getUserHref(a){return a?`/user?id=${a.user}`:null}_getCommentHref(a,b){return a?`/item?id=${b}#${a.id}`:null}}customElements.define("hn-comment",g)}});