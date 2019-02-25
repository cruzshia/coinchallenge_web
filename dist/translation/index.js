"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _en = _interopRequireDefault(require("react-intl/locale-data/en"));

var _zh = _interopRequireDefault(require("react-intl/locale-data/zh"));

var _en2 = _interopRequireDefault(require("./en.json"));

var _zh_TW = _interopRequireDefault(require("./zh_TW.json"));

var _zh_CN = _interopRequireDefault(require("./zh_CN.json"));

var _utils = require("../utils");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_en.default), _toConsumableArray(_zh.default)));
var messgaes = {
  en_US: _en2.default,
  zh_TW: _zh_TW.default,
  zh_CN: _zh_CN.default
};

function _default(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(MutilLang, _React$Component);

      function MutilLang(props) {
        var _this;

        _classCallCheck(this, MutilLang);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(MutilLang).call(this, props));
        _this.state = {
          lang: (0, _utils.parseLangPath)(_this.props.location.search)
        };
        return _this;
      }

      _createClass(MutilLang, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          var history = this.props.history;
          history.listen(function (location) {
            var urlParams = new URLSearchParams(location.search);
            var nextLang = urlParams.get('l');

            if (nextLang && nextLang.length && nextLang !== _this2.state.lang) {
              _jsCookie.default.set('_coin_lng_', nextLang);

              _this2.setState({
                lang: nextLang
              });
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var lang = this.state.lang;
          var locale = lang.indexOf('en') > -1 ? 'en' : 'zh';
          return _react.default.createElement(_reactIntl.IntlProvider, {
            locale: locale,
            messages: messgaes[lang]
          }, _react.default.createElement(WrappedComponent, null));
        }
      }]);

      return MutilLang;
    }(_react.default.Component)
  );
}