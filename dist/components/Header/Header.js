"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _themeColor = require("../../contants/themeColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)({
  topBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    background: _themeColor.APP_THEME_BACKGROUND,
    textAlign: 'center',
    lineHeight: '50px',
    color: _themeColor.APP_FONT_COLOR
  }
});

function ButtonAppBar(_ref) {
  var title = _ref.title;
  var classes = useStyles({});
  return _react.default.createElement(_AppBar.default, {
    position: "static",
    className: classes.topBar
  }, _react.default.createElement("h1", null, title));
}

var _default = ButtonAppBar;
exports.default = _default;
//# sourceMappingURL=Header.js.map