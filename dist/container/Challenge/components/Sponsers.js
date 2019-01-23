"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeColor = require("../../../contants/themeColor");

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _common = require("../../../contants/common");

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SnackbarCtr = (0, _styledComponents.default)('div')(_defineProperty({
  position: 'relative',
  margin: '10px 0',
  '.bar-item': {
    width: '558px',
    div: {
      width: '100%'
    }
  }
}, "@media (max-width:".concat(_common.breakPoint, ")"), {
  width: '100%',
  '.bar-item': {
    width: '100%'
  }
}));
var SponserCtr = (0, _styledComponents.default)('div')({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});
var Address = (0, _styledComponents.default)('span')({
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.3)'
});
var InnerContent = (0, _styledComponents.default)('div')(_defineProperty({
  display: 'flex',
  justifyContent: 'space-between'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  flexDirection: 'column-reverse'
}));
var CoinTxt = (0, _styledComponents.default)('div')({
  color: '#ffeb3b',
  textAlign: 'right'
});
var Comment = (0, _styledComponents.default)('span')({
  fontSize: '16px'
});

function Sponsers(_ref) {
  var sponsors = _ref.sponsors;
  return _react.default.createElement(SponserCtr, null, sponsors.map(function (sponser, idx) {
    return _react.default.createElement(SnackbarCtr, {
      key: idx
    }, _react.default.createElement(_SnackbarContent.default, {
      "aria-describedby": "client-snackbar",
      style: {
        backgroundColor: _themeColor.COLOR_BAR[idx % 3]
      },
      className: "bar-item",
      message: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(InnerContent, null, _react.default.createElement(Address, null, sponser.who), _react.default.createElement(CoinTxt, null, "+", _web.default.utils.fromWei(sponser.amount), ' ', process.env.REACT_APP_COIN)), _react.default.createElement(Comment, null, sponser.comment))
    }));
  }));
}

var _default = Sponsers;
exports.default = _default;