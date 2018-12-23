"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradientFontBlue = exports.GradientFont = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _themeColor = require("../../contants/themeColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GradientFont = function GradientFont(domTag) {
  return (0, _styledComponents.default)(domTag)({
    color: _themeColor.APP_THEME,
    background: "-webkit-linear-gradient(".concat(_themeColor.APP_THEME, ", ").concat(_themeColor.APP_SUB_THEME, ")"),
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  });
};

exports.GradientFont = GradientFont;

var GradientFontBlue = function GradientFontBlue(domTag) {
  return (0, _styledComponents.default)(domTag)({
    color: _themeColor.APP_THEME,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  });
};

exports.GradientFontBlue = GradientFontBlue;
//# sourceMappingURL=Common.js.map