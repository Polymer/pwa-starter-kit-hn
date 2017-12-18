webpackJsonp([5],{

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchItemIfNeeded = exports.currentItemSelector = exports.HnItemElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

__webpack_require__(45);

__webpack_require__(35);

var _items = __webpack_require__(36);

var _items2 = _interopRequireDefault(_items);

var _favorites = __webpack_require__(37);

var _favorites2 = _interopRequireDefault(_favorites);

var _store = __webpack_require__(12);

__webpack_require__(44);

__webpack_require__(49);

var _items3 = __webpack_require__(43);

var _favorites3 = __webpack_require__(34);

var _connectMixin = __webpack_require__(15);

var _sharedStyles = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_store.store.addReducers({
  favorites: _favorites2.default,
  items: _items2.default
});

_store.store.dispatch((0, _favorites3.loadFavorites)());

var HnItemElement = exports.HnItemElement = function (_connect) {
  _inherits(HnItemElement, _connect);

  function HnItemElement() {
    _classCallCheck(this, HnItemElement);

    return _possibleConstructorReturn(this, (HnItemElement.__proto__ || Object.getPrototypeOf(HnItemElement)).apply(this, arguments));
  }

  _createClass(HnItemElement, [{
    key: 'update',
    value: function update(state) {
      var item = (0, _items.currentItemSelector)(state);
      if (item) {
        document.title = item.title;
        this.setProperties({
          favorites: state.favorites,
          item: item
        });
      }
    }
  }, {
    key: '_isFavorite',
    value: function _isFavorite(favorites, item) {
      return Boolean(favorites && item && favorites[item.id]);
    }
  }, {
    key: '_reload',
    value: function _reload() {
      _store.store.dispatch((0, _items3.fetchItem)(this.item));
    }
  }], [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <button on-click="_reload">Reload</button>\n    <div hidden$="[[item.failure]]">\n      <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>\n      <div hidden$="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>\n      <dom-repeat items="[[item.comments]]" as="comment">\n        <template>\n          <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[item.id]]"></hn-comment>\n        </template>\n      </dom-repeat>\n    </div>\n    <dom-if if="[[item.failure]]">\n      <template>\n        <p>Item not found</p>\n      </template>\n    </dom-if>';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        item: Object
      };
    }
  }]);

  return HnItemElement;
}((0, _connectMixin.connect)(_store.store)(_polymerElement.Element));

customElements.define('hn-item', HnItemElement);

exports.currentItemSelector = _items.currentItemSelector;
exports.fetchItemIfNeeded = _items3.fetchItemIfNeeded;

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HnCommentElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

__webpack_require__(35);

var _sharedStyles = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HnCommentElement = exports.HnCommentElement = function (_PolymerElement) {
  _inherits(HnCommentElement, _PolymerElement);

  function HnCommentElement() {
    _classCallCheck(this, HnCommentElement);

    return _possibleConstructorReturn(this, (HnCommentElement.__proto__ || Object.getPrototypeOf(HnCommentElement)).apply(this, arguments));
  }

  _createClass(HnCommentElement, [{
    key: '_toggleCollapsed',
    value: function _toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }, {
    key: '_getUserHref',
    value: function _getUserHref(comment) {
      return comment ? '/user?id=' + comment.user : null;
    }
  }, {
    key: '_getCommentHref',
    value: function _getCommentHref(comment, itemId) {
      return comment ? '/item?id=' + itemId + '#' + comment.id : null;
    }
  }], [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <style>\n      .indent {\n        margin-left: 36px;\n      }\n    </style>\n    <div>\n      <button on-click="_toggleCollapsed">[\u2013]</button>\n      <a href$="[[_getUserHref(comment)]]">[[comment.user]]</a>\n      <a href$="[[_getCommentHref(comment, itemId)]]">[[comment.time_ago]]</a></div>\n    </div>\n    <div hidden$="[[collapsed]]">\n      <div inner-h-t-m-l="[[comment.content]]"></div>\n      <div class="indent">\n        <dom-repeat items="[[comment.comments]]" as="comment">\n          <template>\n            <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[itemId]]"></hn-comment>\n          </template>\n        </dom-repeat>\n      </div>\n    </div>\n    ';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        comment: Object,

        itemId: String,

        collapsed: Boolean
      };
    }
  }]);

  return HnCommentElement;
}(_polymerElement.Element);

// This element registers itself because its recursive - its template depends
// on its registered tag name.


customElements.define('hn-comment', HnCommentElement);

/***/ })

});