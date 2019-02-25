"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("../../../contants/common");

var _logo = _interopRequireDefault(require("../../../images/logo.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StyledTtitleCtr = (0, _styledComponents.default)('div')(_defineProperty({
  position: 'relative'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  minHeight: 0
}));
var StyledTitle = (0, _styledComponents.default)('span')({
  position: 'absolute',
  top: 0,
  fontSize: '34px',
  padding: '20px 0 0 20px',
  lineHeight: '30px',
  width: '100%',
  '.goal': {
    fontSize: '24px'
  }
});
var Logo = (0, _styledComponents.default)('img')({
  display: 'block',
  width: '50%',
  margin: '0 auto'
});

var ChallengeCard = _react.default.memo(function (_ref) {
  var goal = _ref.goal,
      name = _ref.name,
      url = _ref.url,
      invalidAddress = _ref.invalidAddress;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(StyledTtitleCtr, null, _react.default.createElement(StyledTitle, null, invalidAddress ? '' : name, _react.default.createElement("br", null), _react.default.createElement("span", {
    className: "goal"
  }, url === '' ? '' : goal)), invalidAddress || url === '' ? _react.default.createElement(Logo, {
    src: _logo.default
  }) : _react.default.createElement("img", {
    src: url,
    width: "100%"
  })));
});

var _default = ChallengeCard;
exports.default = _default;