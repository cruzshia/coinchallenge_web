"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeColor = require("../../../contants/themeColor");

var _common = require("../../../contants/common");

var _reactIntl = require("react-intl");

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _styles = require("@material-ui/core/styles");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background: ", ";\n  justify-content: center;\n  align-items: center;\n  @media (max-width: ", ") {\n    flex-direction: column;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledFont = (0, _styledComponents.default)('span')({
  fontSize: '40px',
  color: _themeColor.APP_THEME,
  textAlign: 'center'
});
var StyledUnitFont = (0, _styledComponents.default)('span')({
  color: _themeColor.APP_FONT_COLOR_DARK,
  opacity: 0.6
});
var StyledContent = (0, _styledComponents.default)('div')({
  fontSize: 24,
  color: _themeColor.APP_FONT_COLOR_DARK,
  opacity: 0.6,
  margin: '10px'
});
var CrowdCtr = (0, _styledComponents.default)('div')({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center'
});
var InfoBlk = (0, _styledComponents.default)('div')({
  textAlign: 'center',
  background: _themeColor.APP_LIGHT_BG
});
var StyledInfoCtr = (0, _styledComponents.default)('div')(_templateObject(), function (props) {
  return props.bgcolor ? props.bgcolor : _themeColor.APP_LIGHT_BG;
}, _common.breakPoint);
var Grid = (0, _styledComponents.default)('div')(_defineProperty({
  width: '50%',
  padding: '10px 0'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));
var InfoTxt = (0, _styledComponents.default)('div')({
  color: _themeColor.APP_THEME,
  padding: 5,
  fontSize: 30
});

var styles = function styles(_theme) {
  return {
    lightTooltip: {
      fontSize: 20
    }
  };
};

var Address = (0, _styledComponents.default)('div')({
  background: '#fff',
  color: 'rgba(0, 0, 0, 0.4)',
  padding: '10px 0'
});
var Amount = (0, _styledComponents.default)('div')({
  fontSize: 40,
  padding: '10px 0'
});
var REACT_APP_COIN = process.env.REACT_APP_COIN;

function ChallengeInfo(_ref) {
  var address = _ref.address,
      completeDays = _ref.completeDays,
      targetDays = _ref.targetDays,
      totalDays = _ref.totalDays,
      amount = _ref.amount,
      classes = _ref.classes,
      intl = _ref.intl,
      invalidAddress = _ref.invalidAddress,
      sponsorAmount = _ref.sponsorAmount;
  return _react.default.createElement(InfoBlk, null, _react.default.createElement(Address, null, invalidAddress ? '--' : address), _react.default.createElement(Amount, null, amount, " ", REACT_APP_COIN), _react.default.createElement(StyledInfoCtr, null, _react.default.createElement(Grid, null, _react.default.createElement(StyledFont, null, completeDays, "/", totalDays), _react.default.createElement(StyledUnitFont, null, " Days")), _react.default.createElement(Grid, null, _react.default.createElement(CrowdCtr, null, _react.default.createElement(StyledUnitFont, null, "Achieve "), _react.default.createElement(StyledFont, null, "\xA0", (0, _utils.formatPercent)(completeDays, totalDays), "%")))), _react.default.createElement(StyledContent, null, intl.formatMessage({
    id: 'sponsorContent'
  })), _react.default.createElement(InfoTxt, null, "Achieve rate grater than ", (0, _utils.formatPercent)(targetDays, totalDays), "% can get", ' ', _react.default.createElement(_Tooltip.default, {
    title: "".concat((0, _utils.formatNumber)(amount), " ").concat(REACT_APP_COIN, " from bet , ").concat((0, _utils.formatNumber)(sponsorAmount), " ").concat(REACT_APP_COIN, " from sponsor"),
    placement: "top",
    classes: {
      tooltip: classes.lightTooltip
    }
  }, _react.default.createElement("span", {
    style: {
      fontSize: '30px'
    }
  }, (0, _utils.formatNumber)(amount + sponsorAmount), REACT_APP_COIN))));
}

var _default = (0, _styles.withStyles)(styles)((0, _reactIntl.injectIntl)(ChallengeInfo));

exports.default = _default;