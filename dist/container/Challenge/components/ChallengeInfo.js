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

var _styles = require("@material-ui/core/styles");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background: ", ";\n  justify-content: center;\n  align-items: center;\n  @media (max-width: ", ") {\n    ", " {\n      font-size: 28px;\n      word-break: keep-all;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StyledFont = (0, _styledComponents.default)('span')({
  fontSize: '40px',
  fontWeight: 700,
  color: _themeColor.APP_THEME,
  textAlign: 'center'
});
var StyledUnitFont = (0, _styledComponents.default)('span')({
  fontSize: 14,
  color: _themeColor.APP_FONT_COLOR_DARK,
  opacity: 0.6,
  wordBreak: 'keep-all'
});
var StyledContent = (0, _styledComponents.default)('div')(_defineProperty({
  fontSize: 16,
  color: _themeColor.APP_FONT_COLOR_DARK,
  opacity: 0.6,
  margin: '10px auto',
  lineHeight: '24px',
  textAlign: 'left',
  maxWidth: '80%'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  fontSize: 16,
  lineHeight: '24px',
  maxWidth: '100%'
}));
var CrowdCtr = (0, _styledComponents.default)('div')({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center'
});
var InfoBlk = (0, _styledComponents.default)('div')({
  textAlign: 'center',
  background: _themeColor.APP_LIGHT_BG,
  padding: '0 10px',
  wordBreak: 'break-all'
});
var Grid = (0, _styledComponents.default)('div')(_defineProperty({
  width: '50%',
  padding: '10px 0'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));

var styles = function styles(_theme) {
  return {
    lightTooltip: {
      fontSize: 20
    }
  };
};

var Address = (0, _styledComponents.default)('div')({
  color: 'rgba(0, 0, 0, 0.4)',
  padding: '10px 0'
});
var Amount = (0, _styledComponents.default)('div')({
  fontSize: 40,
  fontWeight: 700,
  padding: '10px 0'
});
var StyledInfoCtr = (0, _styledComponents.default)('div')(_templateObject(), function (props) {
  return props.bgcolor ? props.bgcolor : _themeColor.APP_LIGHT_BG;
}, _common.breakPoint, StyledFont);

function ChallengeInfo(_ref) {
  var address = _ref.address,
      completeDays = _ref.completeDays,
      totalDays = _ref.totalDays,
      targetDays = _ref.targetDays,
      amount = _ref.amount,
      intl = _ref.intl,
      invalidAddress = _ref.invalidAddress,
      coin = _ref.coin;
  return _react.default.createElement(InfoBlk, null, _react.default.createElement(Address, null, invalidAddress ? '--' : address), _react.default.createElement(Amount, null, Number(amount), " ", coin), _react.default.createElement(StyledInfoCtr, null, _react.default.createElement(Grid, null, _react.default.createElement(StyledFont, null, completeDays, "/", totalDays), _react.default.createElement(StyledUnitFont, null, " ", intl.formatMessage({
    id: 'days'
  }))), _react.default.createElement(Grid, null, _react.default.createElement(CrowdCtr, null, _react.default.createElement(StyledUnitFont, null, intl.formatMessage({
    id: 'achieve'
  }), ' '), _react.default.createElement(StyledFont, null, "\xA0", (0, _utils.formatPercent)(completeDays, totalDays))))), _react.default.createElement(StyledContent, null, intl.formatMessage({
    id: 'completeDesc'
  }, {
    targetDays: targetDays
  })), _react.default.createElement(StyledContent, null, intl.formatMessage({
    id: 'sponsorContent'
  })));
}

var _default = (0, _styles.withStyles)(styles)((0, _reactIntl.injectIntl)(ChallengeInfo));

exports.default = _default;