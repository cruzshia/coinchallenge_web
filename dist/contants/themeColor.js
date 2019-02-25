"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLOR_BAR = exports.APP_THEME_BACKGROUND = exports.APP_LIGHT_BG = exports.APP_FONT_COLOR_DARK = exports.APP_FONT_COLOR = exports.APP_SUB_THEME = exports.APP_THEME = void 0;
var _process$env = process.env,
    REACT_APP_THEME = _process$env.REACT_APP_THEME,
    REACT_APP_SUB_THEME = _process$env.REACT_APP_SUB_THEME,
    REACT_APP_FONT_COLOR = _process$env.REACT_APP_FONT_COLOR,
    REACT_APP_THEME_BACKGROUND = _process$env.REACT_APP_THEME_BACKGROUND;
var APP_THEME = REACT_APP_THEME || '#ff5864';
exports.APP_THEME = APP_THEME;
var APP_SUB_THEME = REACT_APP_SUB_THEME || '#ff99a0';
exports.APP_SUB_THEME = APP_SUB_THEME;
var APP_FONT_COLOR = REACT_APP_FONT_COLOR || '#fffafa';
exports.APP_FONT_COLOR = APP_FONT_COLOR;
var APP_FONT_COLOR_DARK = '#101010';
exports.APP_FONT_COLOR_DARK = APP_FONT_COLOR_DARK;
var APP_LIGHT_BG = 'rgb(255,250,250)'; //'#fffafa'

exports.APP_LIGHT_BG = APP_LIGHT_BG;
var APP_THEME_BACKGROUND = REACT_APP_THEME_BACKGROUND || "linear-gradient(45deg, ".concat(APP_THEME, " 30%, ").concat(APP_SUB_THEME, " 90%)");
exports.APP_THEME_BACKGROUND = APP_THEME_BACKGROUND;
var COLOR_BAR = ['#ff6776', 'rgba(0, 118, 216, 0.6)', 'rgba(0, 163, 56, 0.6)'];
exports.COLOR_BAR = COLOR_BAR;