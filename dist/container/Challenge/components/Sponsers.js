"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeColor = require("../../../contants/themeColor");

var _common = require("../../../contants/common");

var _web = _interopRequireDefault(require("web3"));

var _mediaMaxWidth$;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SponserCtr = (0, _styledComponents.default)('div')({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});
var BarCtr = (0, _styledComponents.default)('div')(_defineProperty({
  width: 'calc(80% - 20px)',
  minWidth: '558px',
  background: _themeColor.APP_LIGHT_BG,
  marginBottom: '15px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%',
  minWidth: 0,
  padding: '0 10px'
}));
var Address = (0, _styledComponents.default)('span')({
  fontSize: '12px',
  paddingRight: '10px',
  color: 'rgba(0, 0, 0, 0.3)'
});
var CoinTxt = (0, _styledComponents.default)('div')({
  color: _themeColor.APP_THEME,
  textAlign: 'right'
});
var Comment = (0, _styledComponents.default)('span')({
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.8)'
});
var SponsorTitle = (0, _styledComponents.default)('div')(_defineProperty({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '5px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), (_mediaMaxWidth$ = {
  alignItems: 'center'
}, _defineProperty(_mediaMaxWidth$, Address, {
  flex: 3,
  wordBreak: 'break-all'
}), _defineProperty(_mediaMaxWidth$, CoinTxt, {
  flex: 1
}), _mediaMaxWidth$)));

function Sponsers(_ref) {
  var sponsors = _ref.sponsors,
      coin = _ref.coin;
  return _react.default.createElement(SponserCtr, null, sponsors.map(function (sponsor, idx) {
    return _react.default.createElement(BarCtr, {
      key: idx
    }, _react.default.createElement(SponsorTitle, null, _react.default.createElement(Address, null, sponsor.who), _react.default.createElement(CoinTxt, null, "+", Number(_web.default.utils.fromWei(sponsor.amount)), " ", coin)), _react.default.createElement("div", null, _react.default.createElement(Comment, null, sponsor.comment)));
  }));
}

var _default = Sponsers;
exports.default = _default;