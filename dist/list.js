webpackJsonp([4],{

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchListIfNeeded = exports.currentListSelector = exports.HnListElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

__webpack_require__(35);

var _lists = __webpack_require__(47);

var _lists2 = _interopRequireDefault(_lists);

var _items2 = __webpack_require__(36);

var _items3 = _interopRequireDefault(_items2);

var _favorites = __webpack_require__(37);

var _favorites2 = _interopRequireDefault(_favorites);

var _store = __webpack_require__(12);

__webpack_require__(44);

var _lists3 = __webpack_require__(42);

var _favorites3 = __webpack_require__(34);

var _connectMixin = __webpack_require__(15);

var _sharedStyles = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_store.store.addReducers({
  lists: _lists2.default,
  favorites: _favorites2.default,
  items: _items3.default
});

_store.store.dispatch((0, _favorites3.loadFavorites)());

var HnListElement = exports.HnListElement = function (_connect) {
  _inherits(HnListElement, _connect);

  function HnListElement() {
    _classCallCheck(this, HnListElement);

    return _possibleConstructorReturn(this, (HnListElement.__proto__ || Object.getPrototypeOf(HnListElement)).apply(this, arguments));
  }

  _createClass(HnListElement, [{
    key: 'update',
    value: function update(state) {
      var list = (0, _lists.currentListSelector)(state);
      if (list) {
        document.title = list.id;
        var props = {
          favorites: state.favorites,
          list: list
        };
        var _items = (0, _lists.currentItemsSelector)(state);
        if (_items) {
          props.items = _items;
        }
        this.setProperties(props);
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
      _store.store.dispatch((0, _lists3.fetchList)(this.list));
    }
  }], [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <button on-click="_reload">Reload</button>\n    <dom-repeat items="[[items]]">\n      <template>\n        <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>\n      </template>\n    </dom-repeat>\n    ';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        list: Object,

        favorites: Object,

        items: Array
      };
    }
  }]);

  return HnListElement;
}((0, _connectMixin.connect)(_store.store)(_polymerElement.Element));

customElements.define('hn-list', HnListElement);

exports.currentListSelector = _lists.currentListSelector;
exports.fetchListIfNeeded = _lists3.fetchListIfNeeded;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST_LIST = exports.REQUEST_LIST = 'REQUEST_LIST';
var RECEIVE_LIST = exports.RECEIVE_LIST = 'RECEIVE_LIST';
var FAIL_LIST = exports.FAIL_LIST = 'FAIL_LIST';

var fetchList = exports.fetchList = function fetchList(list) {
  return function (dispatch) {
    dispatch(requestList(list.id));
    fetch('https://node-hnapi.herokuapp.com/' + list.id).then(function (res) {
      return res.json();
    }).then(function (items) {
      return dispatch(receiveList(list.id, items));
    }).catch(function () {
      return dispatch(failList(list.id));
    });
  };
};

var fetchListIfNeeded = exports.fetchListIfNeeded = function fetchListIfNeeded(list) {
  return function (dispatch) {
    if (list && !list.items && !list.isFetching) {
      dispatch(fetchList(list));
    }
  };
};

var requestList = function requestList(listId) {
  return {
    type: REQUEST_LIST,
    listId: listId
  };
};

var receiveList = function receiveList(listId, items) {
  return {
    type: RECEIVE_LIST,
    listId: listId,
    items: items
  };
};

var failList = function failList(listId) {
  return {
    type: FAIL_LIST,
    listId: listId
  };
};

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentItemsSelector = exports.currentListSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lists = __webpack_require__(42);

var _index = __webpack_require__(14);

var _location = __webpack_require__(4);

var _items = __webpack_require__(36);

var _favorites = __webpack_require__(37);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lists = function lists() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _lists.REQUEST_LIST:
    case _lists.RECEIVE_LIST:
    case _lists.FAIL_LIST:
      var listId = action.listId;
      return _extends({}, state, _defineProperty({}, listId, list(state[listId], action)));
    default:
      return state;
  }
};

var list = function list() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _lists.REQUEST_LIST:
      return _extends({}, state, {
        id: action.listId,
        failure: false,
        isFetching: true
      });
    case _lists.RECEIVE_LIST:
      return _extends({}, state, {
        failure: false,
        isFetching: false,
        items: action.items.map(function (item) {
          return item.id;
        })
      });
    case _lists.FAIL_LIST:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

exports.default = lists;


var listsSelector = function listsSelector(state) {
  return state.lists;
};

var currentListSelector = exports.currentListSelector = (0, _index.createSelector)(listsSelector, _favorites.favoritesSelector, _location.splitPathnameSelector, function (lists, favorites, splitPath) {
  switch (splitPath[0]) {
    case '':
      return lists['news'] || { id: 'news' };
    case 'new':
      return lists['newest'] || { id: 'newest' };
    case 'ask':
    case 'show':
    case 'jobs':
      return lists[splitPath[0]] || { id: splitPath[0] };
    case 'favorites':
      return { id: 'favorites', items: Object.keys(favorites).map(function (id) {
          return parseInt(id, 10);
        }) };
    default:
      return null;
  }
});

var currentItemsSelector = exports.currentItemsSelector = (0, _index.createSelector)(currentListSelector, _items.itemsSelector, function (list, items) {
  return list && list.items ? list.items.map(function (id) {
    return items[id] || { id: id };
  }) : null;
});

/***/ })

});