webpackJsonp([4],{

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_polymer_polymer_lib_elements_dom_repeat_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_items_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers_favorites_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hn_summary_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_lists_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_favorites_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_connect_mixin_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_styles_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "currentListSelector", function() { return __WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fetchListIfNeeded", function() { return __WEBPACK_IMPORTED_MODULE_7__actions_lists_js__["e"]; });












__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].addReducers({
  lists: __WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["c" /* default */],
  favorites: __WEBPACK_IMPORTED_MODULE_4__reducers_favorites_js__["a" /* default */],
  items: __WEBPACK_IMPORTED_MODULE_3__reducers_items_js__["b" /* default */]
});

__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_8__actions_favorites_js__["d" /* loadFavorites */])());

class HnListElement extends Object(__WEBPACK_IMPORTED_MODULE_9__lib_connect_mixin_js__["a" /* connect */])(__WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */])(__WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */]) {
  static get template() {
    return `
    ${__WEBPACK_IMPORTED_MODULE_10__shared_styles_js__["a" /* sharedStyles */]}
    <button on-click="_reload">Reload</button>
    <dom-repeat items="[[items]]">
      <template>
        <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      </template>
    </dom-repeat>
    `;
  }

  static get properties() {
    return {
      list: Object,

      favorites: Object,

      items: Array
    };
  }

  update(state) {
    const list = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["b" /* currentListSelector */])(state);
    if (list) {
      document.title = list.id;
      const props = {
        favorites: state.favorites,
        list
      };
      const items = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["a" /* currentItemsSelector */])(state);
      if (items) {
        props.items = items;
      }
      this.setProperties(props);
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }

  _reload() {
    __WEBPACK_IMPORTED_MODULE_5__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__actions_lists_js__["d" /* fetchList */])(this.list));
  }
}
/* harmony export (immutable) */ __webpack_exports__["HnListElement"] = HnListElement;


customElements.define('hn-list', HnListElement);



/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const REQUEST_LIST = 'REQUEST_LIST';
/* harmony export (immutable) */ __webpack_exports__["c"] = REQUEST_LIST;

const RECEIVE_LIST = 'RECEIVE_LIST';
/* harmony export (immutable) */ __webpack_exports__["b"] = RECEIVE_LIST;

const FAIL_LIST = 'FAIL_LIST';
/* harmony export (immutable) */ __webpack_exports__["a"] = FAIL_LIST;


const fetchList = list => dispatch => {
  dispatch(requestList(list.id));
  fetch(`https://node-hnapi.herokuapp.com/${list.id}`).then(res => res.json()).then(items => dispatch(receiveList(list.id, items))).catch(() => dispatch(failList(list.id)));
};
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchList;


const fetchListIfNeeded = list => dispatch => {
  if (list && !list.items && !list.isFetching) {
    dispatch(fetchList(list));
  }
};
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchListIfNeeded;


const requestList = listId => {
  return {
    type: REQUEST_LIST,
    listId
  };
};

const receiveList = (listId, items) => {
  return {
    type: RECEIVE_LIST,
    listId,
    items
  };
};

const failList = listId => {
  return {
    type: FAIL_LIST,
    listId
  };
};

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__items_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__favorites_js__ = __webpack_require__(37);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const lists = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["c" /* REQUEST_LIST */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["b" /* RECEIVE_LIST */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["a" /* FAIL_LIST */]:
      const listId = action.listId;
      return _extends({}, state, {
        [listId]: list(state[listId], action)
      });
    default:
      return state;
  }
};

const list = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["c" /* REQUEST_LIST */]:
      return _extends({}, state, {
        id: action.listId,
        failure: false,
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["b" /* RECEIVE_LIST */]:
      return _extends({}, state, {
        failure: false,
        isFetching: false,
        items: action.items.map(item => item.id)
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["a" /* FAIL_LIST */]:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["c"] = (lists);

const listsSelector = state => state.lists;

const currentListSelector = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__["a" /* createSelector */])(listsSelector, __WEBPACK_IMPORTED_MODULE_4__favorites_js__["b" /* favoritesSelector */], __WEBPACK_IMPORTED_MODULE_2__location_js__["c" /* splitPathnameSelector */], (lists, favorites, splitPath) => {
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
      return { id: 'favorites', items: Object.keys(favorites).map(id => parseInt(id, 10)) };
    default:
      return null;
  }
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentListSelector;


const currentItemsSelector = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__["a" /* createSelector */])(currentListSelector, __WEBPACK_IMPORTED_MODULE_3__items_js__["c" /* itemsSelector */], (list, items) => {
  return list && list.items ? list.items.map(id => items[id] || { id }) : null;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = currentItemsSelector;


/***/ })

});