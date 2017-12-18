webpackJsonp([3],{

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserIfNeeded = exports.currentUserSelector = exports.HnUserElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

__webpack_require__(45);

var _users = __webpack_require__(48);

var _users2 = _interopRequireDefault(_users);

var _store = __webpack_require__(12);

var _users3 = __webpack_require__(46);

var _connectMixin = __webpack_require__(15);

var _sharedStyles = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_store.store.addReducers({
  users: _users2.default
});

var HnUserElement = exports.HnUserElement = function (_connect) {
  _inherits(HnUserElement, _connect);

  function HnUserElement() {
    _classCallCheck(this, HnUserElement);

    return _possibleConstructorReturn(this, (HnUserElement.__proto__ || Object.getPrototypeOf(HnUserElement)).apply(this, arguments));
  }

  _createClass(HnUserElement, [{
    key: 'update',
    value: function update(state) {
      var user = (0, _users.currentUserSelector)(state);
      if (user) {
        document.title = user.id;
        this.setProperties({
          user: user
        });
      }
    }
  }, {
    key: '_reload',
    value: function _reload() {
      _store.store.dispatch((0, _users3.fetchUser)(this.user));
    }
  }], [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <style>\n      table {\n        margin: 1em 0;\n      }\n    </style>\n    <button on-click="_reload">Reload</button>\n    <table hidden$="[[user.failure]]">\n      <tr>\n        <td>User:</td><td>[[user.id]]</td>\n      </tr>\n      <tr>\n        <td>Created:</td><td>[[user.created]]</td>\n      </tr>\n      <tr>\n        <td>Karma:</td><td>[[user.karma]]</td>\n      </tr>\n    </table>\n    <dom-if if="[[user.failure]]">\n      <template>\n        <p>User not found</p>\n      </template>\n    </dom-if>';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        user: Object
      };
    }
  }]);

  return HnUserElement;
}((0, _connectMixin.connect)(_store.store)(_polymerElement.Element));

customElements.define('hn-user', HnUserElement);

exports.currentUserSelector = _users.currentUserSelector;
exports.fetchUserIfNeeded = _users3.fetchUserIfNeeded;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST_USER = exports.REQUEST_USER = 'REQUEST_USER';
var RECEIVE_USER = exports.RECEIVE_USER = 'RECEIVE_USER';
var FAIL_USER = exports.FAIL_USER = 'FAIL_USER';

var fetchUser = exports.fetchUser = function fetchUser(user) {
  return function (dispatch) {
    dispatch(requestUser(user.id));
    fetch('https://node-hnapi.herokuapp.com/user/' + user.id).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.error) {
        throw data.error;
      }
      dispatch(receiveUser(user.id, data));
    }).catch(function () {
      return dispatch(failUser(user.id));
    });
  };
};

var fetchUserIfNeeded = exports.fetchUserIfNeeded = function fetchUserIfNeeded(user) {
  return function (dispatch) {
    if (user && !user.created_time && !user.isFetching) {
      dispatch(fetchUser(user));
    }
  };
};

var requestUser = function requestUser(userId) {
  return {
    type: REQUEST_USER,
    userId: userId
  };
};

var receiveUser = function receiveUser(userId, data) {
  return {
    type: RECEIVE_USER,
    userId: userId,
    data: data
  };
};

var failUser = function failUser(userId) {
  return {
    type: FAIL_USER,
    userId: userId
  };
};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentUserSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _users = __webpack_require__(46);

var _index = __webpack_require__(14);

var _location = __webpack_require__(4);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var users = function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _users.REQUEST_USER:
    case _users.RECEIVE_USER:
    case _users.FAIL_USER:
      var userId = action.userId;
      return _extends({}, state, _defineProperty({}, userId, user(state[userId], action)));
    default:
      return state;
  }
};

var user = function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _users.REQUEST_USER:
      return _extends({}, state, {
        id: action.userId,
        failure: false,
        isFetching: true
      });
    case _users.RECEIVE_USER:
      return _extends({}, state, {
        failure: false,
        isFetching: false
      }, action.data);
    case _users.FAIL_USER:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

exports.default = users;


var usersSelector = function usersSelector(state) {
  return state.users;
};

var currentUserSelector = exports.currentUserSelector = (0, _index.createSelector)(usersSelector, _location.splitPathnameSelector, _location.urlSearchParamsSelector, function (users, splitPath, params) {
  switch (splitPath[0]) {
    case 'user':
      var id = params.get('id');
      return users[id] || { id: id };
    default:
      return null;
  }
});

/***/ })

});