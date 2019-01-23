"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _themeColor = require("../../contants/themeColor");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _Language = _interopRequireDefault(require("@material-ui/icons/Language"));

var _common = require("../../contants/common");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StyledAppBar = (0, _styledComponents.default)(_AppBar.default)({
  position: 'fixed',
  left: 0,
  top: 0,
  background: _themeColor.APP_THEME,
  textAlign: 'center',
  lineHeight: '50px',
  color: _themeColor.APP_FONT_COLOR
});
var LangIcon = (0, _styledComponents.default)(_Language.default)({
  position: 'absolute',
  top: 15,
  right: 10
});
var LangMenu = [{
  value: _common.supportLang[0],
  title: 'English'
}, {
  value: _common.supportLang[1],
  title: '繁體中文'
}, {
  value: _common.supportLang[2],
  title: '简体中文'
}];

var ButtonAppBar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ButtonAppBar, _PureComponent);

  function ButtonAppBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ButtonAppBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ButtonAppBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      anchorEl: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handeClick", function (e) {
      _this.setState({
        anchorEl: e.currentTarget
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        anchorEl: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectLang", function (lang) {
      return function () {
        var _this$props = _this.props,
            pathname = _this$props.location.pathname,
            history = _this$props.history;
        var matches = (0, _utils.matchPathFunc)(pathname);
        var restUrl = matches.params ? matches.params[0] : '';
        history.push("/".concat(lang, "/").concat(restUrl));

        _this.handleClose();
      };
    });

    return _this;
  }

  _createClass(ButtonAppBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var anchorEl = this.state.anchorEl;
      var open = Boolean(anchorEl);
      return _react.default.createElement(StyledAppBar, null, _react.default.createElement("h1", null, this.props.title, _react.default.createElement(LangIcon, {
        onClick: this.handeClick
      })), _react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, _react.default.createElement(_Menu.default, {
        id: "fade-menu",
        anchorEl: anchorEl,
        open: open,
        onClose: this.handleClose,
        TransitionComponent: _Fade.default
      }, LangMenu.map(function (item) {
        return _react.default.createElement(_MenuItem.default, {
          key: item.value,
          onClick: _this2.onSelectLang(item.value)
        }, item.title);
      }))));
    }
  }]);

  return ButtonAppBar;
}(_react.PureComponent);

var _default = (0, _reactRouterDom.withRouter)(ButtonAppBar);

exports.default = _default;