"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var StyledTxt = (0, _styledComponents.default)('span')({
  color: '#e10050'
});

var Notifier =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Notifier, _React$Component);

  function Notifier() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notifier);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notifier)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "queue", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false,
      messageInfo: {
        key: Math.random(),
        message: ''
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processQueue", function () {
      if (_this.queue.length > 0) {
        _this.setState({
          messageInfo: _this.queue.shift(),
          open: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleExited", function () {
      _this.processQueue();
    });

    return _this;
  }

  _createClass(Notifier, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        _this2.queue.push({
          key: Math.random(),
          message: _react.default.createElement("span", null, Math.random(), " has created a ", _react.default.createElement(StyledTxt, null, "walk"), ' ', "challenge")
        });

        _this2.processQueue();
      }, 3000);
    }
  }, {
    key: "render",
    value: function render() {
      var messageInfo = this.state.messageInfo;
      return _react.default.createElement(_Snackbar.default, {
        key: messageInfo.key,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        open: this.state.open,
        autoHideDuration: 2000,
        onClose: this.handleClose,
        onExited: this.handleExited,
        ContentProps: {
          'aria-describedby': 'message-id'
        },
        message: messageInfo.message,
        action: [_react.default.createElement(_IconButton.default, {
          key: "close",
          "aria-label": "Close",
          color: "inherit",
          onClick: this.handleClose
        }, _react.default.createElement(_Close.default, null))]
      });
    }
  }]);

  return Notifier;
}(_react.default.Component);

var _default = Notifier;
exports.default = _default;
//# sourceMappingURL=Notifier.js.map