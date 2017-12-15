webpackJsonp([3],{

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_polymer_polymer_lib_elements_dom_if_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_users_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_users_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_connect_mixin_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_styles_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "currentUserSelector", function() { return __WEBPACK_IMPORTED_MODULE_2__reducers_users_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserIfNeeded", function() { return __WEBPACK_IMPORTED_MODULE_4__actions_users_js__["e"]; });








__WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].addReducers({
  users: __WEBPACK_IMPORTED_MODULE_2__reducers_users_js__["b" /* default */]
});

class HnUserElement extends Object(__WEBPACK_IMPORTED_MODULE_5__lib_connect_mixin_js__["a" /* connect */])(__WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */])(__WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */]) {
  static get template() {
    return `
    ${__WEBPACK_IMPORTED_MODULE_6__shared_styles_js__["a" /* sharedStyles */]}
    <style>
      table {
        margin: 1em 0;
      }
    </style>
    <button on-click="_reload">Reload</button>
    <table hidden$="[[user.failure]]">
      <tr>
        <td>User:</td><td>[[user.id]]</td>
      </tr>
      <tr>
        <td>Created:</td><td>[[user.created]]</td>
      </tr>
      <tr>
        <td>Karma:</td><td>[[user.karma]]</td>
      </tr>
    </table>
    <dom-if if="[[user.failure]]">
      <template>
        <p>User not found</p>
      </template>
    </dom-if>`;
  }

  static get properties() {
    return {
      user: Object
    };
  }

  update(state) {
    const user = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_users_js__["a" /* currentUserSelector */])(state);
    if (user) {
      document.title = user.id;
      this.setProperties({
        user
      });
    }
  }

  _reload() {
    __WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__actions_users_js__["d" /* fetchUser */])(this.user));
  }
}
/* harmony export (immutable) */ __webpack_exports__["HnUserElement"] = HnUserElement;


customElements.define('hn-user', HnUserElement);



/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const REQUEST_USER = 'REQUEST_USER';
/* harmony export (immutable) */ __webpack_exports__["c"] = REQUEST_USER;

const RECEIVE_USER = 'RECEIVE_USER';
/* harmony export (immutable) */ __webpack_exports__["b"] = RECEIVE_USER;

const FAIL_USER = 'FAIL_USER';
/* harmony export (immutable) */ __webpack_exports__["a"] = FAIL_USER;


const fetchUser = user => dispatch => {
  dispatch(requestUser(user.id));
  fetch(`https://node-hnapi.herokuapp.com/user/${user.id}`).then(res => res.json()).then(data => {
    if (data.error) {
      throw data.error;
    }
    dispatch(receiveUser(user.id, data));
  }).catch(() => dispatch(failUser(user.id)));
};
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchUser;


const fetchUserIfNeeded = user => dispatch => {
  if (user && !user.created_time && !user.isFetching) {
    dispatch(fetchUser(user));
  }
};
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchUserIfNeeded;


const requestUser = userId => {
  return {
    type: REQUEST_USER,
    userId
  };
};

const receiveUser = (userId, data) => {
  return {
    type: RECEIVE_USER,
    userId,
    data
  };
};

const failUser = userId => {
  return {
    type: FAIL_USER,
    userId
  };
};

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_users_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_js__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const users = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["c" /* REQUEST_USER */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["b" /* RECEIVE_USER */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["a" /* FAIL_USER */]:
      const userId = action.userId;
      return _extends({}, state, {
        [userId]: user(state[userId], action)
      });
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["c" /* REQUEST_USER */]:
      return _extends({}, state, {
        id: action.userId,
        failure: false,
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["b" /* RECEIVE_USER */]:
      return _extends({}, state, {
        failure: false,
        isFetching: false
      }, action.data);
    case __WEBPACK_IMPORTED_MODULE_0__actions_users_js__["a" /* FAIL_USER */]:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["b"] = (users);

const usersSelector = state => state.users;

const currentUserSelector = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__["a" /* createSelector */])(usersSelector, __WEBPACK_IMPORTED_MODULE_2__location_js__["c" /* splitPathnameSelector */], __WEBPACK_IMPORTED_MODULE_2__location_js__["d" /* urlSearchParamsSelector */], (users, splitPath, params) => {
  switch (splitPath[0]) {
    case 'user':
      const id = params.get('id');
      return users[id] || { id };
    default:
      return null;
  }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = currentUserSelector;


/***/ })

});