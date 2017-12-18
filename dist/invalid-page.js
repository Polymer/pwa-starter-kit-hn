webpackJsonp([6],{

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HnInvalidPageElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

var _sharedStyles = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HnInvalidPageElement = exports.HnInvalidPageElement = function (_PolymerElement) {
  _inherits(HnInvalidPageElement, _PolymerElement);

  function HnInvalidPageElement() {
    _classCallCheck(this, HnInvalidPageElement);

    return _possibleConstructorReturn(this, (HnInvalidPageElement.__proto__ || Object.getPrototypeOf(HnInvalidPageElement)).apply(this, arguments));
  }

  _createClass(HnInvalidPageElement, null, [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <h1>Page not found</h1>';
    }
  }]);

  return HnInvalidPageElement;
}(_polymerElement.Element);

customElements.define('hn-invalid-page', HnInvalidPageElement);

/***/ })

});