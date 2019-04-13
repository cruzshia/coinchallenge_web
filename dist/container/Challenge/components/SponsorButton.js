"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("../../../contants/common");

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

var FabCtr = (0, _styledComponents.default)('span')({
  display: 'block',
  textAlign: 'center',
  padding: 10,
  zIndex: 6,
  '.sponsor-btn': {
    padding: '0 30px',
    minWidth: '300px',
    lineHeight: '45px'
  }
});

var SponsorButton =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SponsorButton, _React$PureComponent);

  function SponsorButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SponsorButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SponsorButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "amountRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commentRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false,
      amountError: false,
      commentError: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onConfirm", function () {
      var amount = Number(_this.amountRef.current.value);

      var comment = _this.commentRef.current.value.trim();

      var amountError = amount <= 0;
      var commentError = comment === '';

      if (amountError || commentError) {
        _this.setState({
          amountError: amountError,
          commentError: commentError
        });

        return;
      }

      _this.props.onSponsor({
        amount: amount,
        comment: comment
      });

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function () {
      var open = _this.props.checkWallet();

      open && _this.setState({
        open: true
      });
    });

    return _this;
  }

  _createClass(SponsorButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          intl = _this$props.intl,
          chain = _this$props.chain;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(FabCtr, {
        onClick: this.handleOpen
      }, _react.default.createElement(_Button.default, {
        className: "sponsor-btn",
        variant: "contained",
        color: "primary"
      }, intl.formatMessage({
        id: 'sponsor'
      }))), _react.default.createElement(_Dialog.default, {
        open: this.state.open,
        onClose: this.handleClose,
        "aria-labelledby": "form-dialog-title"
      }, _react.default.createElement(_DialogTitle.default, {
        id: "form-dialog-title",
        style: {
          textTransform: 'uppercase'
        }
      }, intl.formatMessage({
        id: 'sponsor'
      })), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_DialogContentText.default, null, intl.formatMessage({
        id: 'sponsorDesc'
      })), _react.default.createElement(_TextField.default, {
        error: this.state.amountError,
        required: true,
        margin: "dense",
        id: "amount",
        label: "".concat(intl.formatMessage({
          id: 'amount'
        }), " (").concat((0, _common.APP_COIN)(chain), ")"),
        type: "number",
        inputRef: this.amountRef,
        fullWidth: true
      }), _react.default.createElement(_TextField.default, {
        error: this.state.commentError,
        required: true,
        margin: "dense",
        id: "comment",
        label: intl.formatMessage({
          id: 'comment'
        }),
        type: "text",
        inputRef: this.commentRef,
        fullWidth: true
      })), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
        onClick: this.handleClose,
        color: "primary"
      }, intl.formatMessage({
        id: 'cancel'
      })), _react.default.createElement(_Button.default, {
        onClick: this.onConfirm,
        color: "primary"
      }, intl.formatMessage({
        id: 'confirm'
      })))));
    }
  }]);

  return SponsorButton;
}(_react.default.PureComponent);

var _default = SponsorButton;
exports.default = _default;