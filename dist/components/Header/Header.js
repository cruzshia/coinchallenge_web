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

var _MonetizationOn = _interopRequireDefault(require("@material-ui/icons/MonetizationOn"));

var _common = require("../../contants/common");

var _reactRedux = require("react-redux");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactIntl = require("react-intl");

var _action = require("../../epics/commonEpic/action");

var _web = _interopRequireDefault(require("web3"));

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
  width: '100vw',
  position: 'fixed',
  left: 0,
  top: 0,
  background: _themeColor.APP_THEME,
  textAlign: 'center',
  lineHeight: '50px',
  color: _themeColor.APP_FONT_COLOR,
  a: {
    color: _themeColor.APP_FONT_COLOR,
    textDecoration: 'none'
  }
});
var LangIcon = (0, _styledComponents.default)(_Language.default)({
  position: 'absolute',
  top: 15,
  right: 10
});
var MonetizationOnIcon = (0, _styledComponents.default)(_MonetizationOn.default)({
  position: 'absolute',
  top: 15,
  right: 42,
  cursor: 'pointer'
});
var Balance = (0, _styledComponents.default)('div')(_defineProperty({
  position: 'absolute',
  top: 2,
  right: 70,
  color: '#fff',
  fontSize: '14px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  display: 'none'
}));
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chain", _this.props.location.pathname.indexOf('dexon') > -1 ? 'dexon' : 'ethereum');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      anchorEl: null,
      openWithdraw: false,
      isWithrawing: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOpenWithdraw", function () {
      _this.setState({
        openWithdraw: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCloseWithraw", function () {
      _this.setState({
        openWithdraw: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWithdraw", function () {
      _this.props.withdrawBalance();

      _this.setState({
        openWithdraw: false,
        isWithrawing: true
      });
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
        var history = _this.props.history;
        history.replace("".concat(history.location.pathname, "?l=").concat(lang));

        _this.handleClose();
      };
    });

    return _this;
  }

  _createClass(ButtonAppBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          anchorEl = _this$state.anchorEl,
          isWithrawing = _this$state.isWithrawing;
      var _this$props = this.props,
          balance = _this$props.balance,
          intl = _this$props.intl;
      var formatBalance = Number(Number(_web.default.utils.fromWei(balance)).toFixed(8));
      var open = Boolean(anchorEl);
      return _react.default.createElement(StyledAppBar, {
        id: "project-header"
      }, _react.default.createElement("h1", null, _react.default.createElement(_reactRouterDom.Link, {
        to: "/"
      }, this.props.title), Number(balance) > 0 && !isWithrawing ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Balance, null, formatBalance, " ", (0, _common.APP_COIN)(this.chain)), _react.default.createElement(MonetizationOnIcon, {
        onClick: this.onOpenWithdraw
      })) : null, _react.default.createElement(LangIcon, {
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
      }))), _react.default.createElement(_Dialog.default, {
        open: this.state.openWithdraw,
        onClose: this.onCloseWithraw,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, _react.default.createElement(_DialogTitle.default, {
        id: "alert-dialog-title"
      }, intl.formatMessage({
        id: 'withdraw'
      })), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_DialogContentText.default, {
        id: "alert-dialog-description"
      }, intl.formatMessage({
        id: 'withdraw.confirm.desc'
      }, {
        balance: "".concat(formatBalance, " ").concat((0, _common.APP_COIN)(this.chain))
      }))), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
        onClick: this.onCloseWithraw,
        color: "primary"
      }, intl.formatMessage({
        id: 'cancel'
      })), _react.default.createElement(_Button.default, {
        onClick: this.onWithdraw,
        color: "primary",
        autoFocus: true
      }, intl.formatMessage({
        id: 'confirm'
      })))));
    }
  }]);

  return ButtonAppBar;
}(_react.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  var commonState = state.get('common');
  return {
    balance: commonState.get('accountBalance')
  };
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
  return {
    withdrawBalance: function withdrawBalance() {
      return dispatch((0, _action.withdrawBalance)());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)((0, _reactRouterDom.withRouter)((0, _reactIntl.injectIntl)(ButtonAppBar)));

exports.default = _default;