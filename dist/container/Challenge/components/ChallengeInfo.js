"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _icons = require("@material-ui/icons");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ProgressChart = _interopRequireDefault(require("./ProgressChart"));

var _podium = _interopRequireDefault(require("../../../images/podium.svg"));

var _ChallengeModule = _interopRequireDefault(require("../Challenge.module.css"));

var _themeColor = require("../../../contants/themeColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PodiumImg = (0, _styledComponents.default)('img')({
  width: 150
});
var StyledFont = (0, _styledComponents.default)('div')({
  fontSize: '20px',
  color: _themeColor.APP_FONT_COLOR,
  textAlign: 'center',
  margin: '10px 0'
});

function StyledIcon(_ref) {
  var Icons = _ref.Icons;
  var NewStyledIcon = (0, _styledComponents.default)(Icons)({
    verticalAlign: 'middle',
    margin: '0 5px 4px 0'
  });
  return _react.default.createElement(NewStyledIcon, null);
}

function ChallengeInfo(_ref2) {
  var completeDays = _ref2.completeDays,
      targetDays = _ref2.targetDays,
      totalDays = _ref2.totalDays,
      percent = _ref2.percent;
  return _react.default.createElement("div", null, _react.default.createElement(StyledFont, null, _react.default.createElement(StyledIcon, {
    Icons: _icons.CheckCircle
  }), "CompleteDays: ", completeDays), _react.default.createElement(StyledFont, null, _react.default.createElement(StyledIcon, {
    Icons: _icons.Directions
  }), "TargetDays: ", targetDays), percent === 100 ? _react.default.createElement(PodiumImg, {
    src: _podium.default,
    className: _ChallengeModule.default.jumpAnimation
  }) : _react.default.createElement(_ProgressChart.default, {
    style: {
      margin: '0 auto'
    },
    width: 160,
    height: 160,
    value: percent
  }));
}

var _default = ChallengeInfo;
exports.default = _default;
//# sourceMappingURL=ChallengeInfo.js.map