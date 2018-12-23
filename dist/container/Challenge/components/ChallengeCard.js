"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _pic = _interopRequireDefault(require("../../../images/pic.png"));

var _medal = _interopRequireDefault(require("../../../images/medal.svg"));

var _moment = _interopRequireDefault(require("moment"));

var _common = require("../../../contants/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StyledTtitleCtr = (0, _styledComponents.default)('div')(_defineProperty({
  position: 'relative',
  minHeight: '450px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  minHeight: 0
}));
var StyledMedal = (0, _styledComponents.default)('img')({
  width: '30px',
  verticalAlign: 'middle',
  marginRight: 10
});
var StyledTitle = (0, _styledComponents.default)('span')({
  position: 'absolute',
  top: 0,
  color: '#fff',
  fontSize: '20px',
  padding: '10px',
  background: 'rgba(0, 0, 0, 0.4)',
  lineHeight: '30px',
  width: '100%'
});

var ChallengeCard = _react.default.memo(function (_ref) {
  var address = _ref.address,
      groupId = _ref.groupId,
      startDayTimestamp = _ref.startDayTimestamp;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(StyledTtitleCtr, null, _react.default.createElement(StyledTitle, null, _react.default.createElement(StyledMedal, {
    src: _medal.default
  }), groupId, " @", (0, _moment.default)(startDayTimestamp).format('MM/DD')), _react.default.createElement("img", {
    src: _pic.default,
    width: "100%"
  })));
});

var _default = ChallengeCard;
exports.default = _default;
//# sourceMappingURL=ChallengeCard.js.map