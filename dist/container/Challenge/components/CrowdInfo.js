"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactAnimatedText = require("react-animated-text");

var _donationWhite = _interopRequireDefault(require("../../../images/donation-white.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CrowdCtr = (0, _styledComponents.default)('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
var StyledText = (0, _styledComponents.default)('span')({
  color: '#fff',
  fontSize: '60px',
  textAlign: 'center'
});

function CrowdInfo() {
  return _react.default.createElement(CrowdCtr, null, _react.default.createElement("img", {
    src: _donationWhite.default,
    width: "50%"
  }), _react.default.createElement(StyledText, null, "+", _react.default.createElement(_reactAnimatedText.Wave, {
    text: "5000",
    speed: 2
  })));
}

var _default = CrowdInfo;
exports.default = _default;
//# sourceMappingURL=CrowdInfo.js.map