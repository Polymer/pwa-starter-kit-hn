webpackJsonp([5],{

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_polymer_polymer_lib_elements_dom_if_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_polymer_polymer_lib_elements_dom_repeat_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_items_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers_favorites_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hn_summary_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__hn_comment_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_items_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_favorites_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_connect_mixin_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_styles_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "currentItemSelector", function() { return __WEBPACK_IMPORTED_MODULE_3__reducers_items_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fetchItemIfNeeded", function() { return __WEBPACK_IMPORTED_MODULE_8__actions_items_js__["e"]; });













__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].addReducers({
  favorites: __WEBPACK_IMPORTED_MODULE_4__reducers_favorites_js__["a" /* default */],
  items: __WEBPACK_IMPORTED_MODULE_3__reducers_items_js__["b" /* default */]
});

__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_9__actions_favorites_js__["d" /* loadFavorites */])());

class HnItemElement extends Object(__WEBPACK_IMPORTED_MODULE_10__lib_connect_mixin_js__["a" /* connect */])(__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */])(__WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */]) {
  static get template() {
    return `
    ${__WEBPACK_IMPORTED_MODULE_11__shared_styles_js__["a" /* sharedStyles */]}
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
    </dom-if>`;
  }

  static get properties() {
    return {
      item: Object
    };
  }

  update(state) {
    const item = Object(__WEBPACK_IMPORTED_MODULE_3__reducers_items_js__["a" /* currentItemSelector */])(state);
    if (item) {
      document.title = item.title;
      this.setProperties({
        favorites: state.favorites,
        item
      });
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }

  _reload() {
    __WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_8__actions_items_js__["d" /* fetchItem */])(this.item));
  }
}
/* harmony export (immutable) */ __webpack_exports__["HnItemElement"] = HnItemElement;


customElements.define('hn-item', HnItemElement);



/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_polymer_polymer_lib_elements_dom_repeat_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_styles_js__ = __webpack_require__(11);




class HnCommentElement extends __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */] {
  static get template() {
    return `
    ${__WEBPACK_IMPORTED_MODULE_2__shared_styles_js__["a" /* sharedStyles */]}
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
    `;
  }

  static get properties() {
    return {
      comment: Object,

      itemId: String,

      collapsed: Boolean
    };
  }

  _toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  _getUserHref(comment) {
    return comment ? `/user?id=${comment.user}` : null;
  }

  _getCommentHref(comment, itemId) {
    return comment ? `/item?id=${itemId}#${comment.id}` : null;
  }
}
/* unused harmony export HnCommentElement */


// This element registers itself because its recursive - its template depends
// on its registered tag name.
customElements.define('hn-comment', HnCommentElement);

/***/ })

});