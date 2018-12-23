"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLiquidGauge = _interopRequireDefault(require("react-liquid-gauge"));

var _themeColor = require("../../../contants/themeColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getColor(value) {
  var colorPlate = {
    fillColor: _themeColor.APP_FONT_COLOR,
    fontColor: _themeColor.APP_FONT_COLOR
  };
  return colorPlate;
}

var ProgressChart = function ProgressChart(props) {
  var plate = getColor(props.value);
  return _react.default.createElement(_reactLiquidGauge.default, _extends({}, props, {
    textRenderer: function textRenderer(props) {
      var value = Math.round(props.value);
      var radius = Math.min(props.height / 2, props.width / 2);
      var textPixels = props.textSize * radius / 2;
      var valueStyle = {
        fontSize: textPixels
      };
      var percentStyle = {
        fontSize: textPixels * 0.6
      };
      return _react.default.createElement("tspan", null, _react.default.createElement("tspan", {
        className: "value",
        style: valueStyle
      }, value), _react.default.createElement("tspan", {
        style: percentStyle
      }, props.percent));
    },
    gradient: true,
    circleStyle: {
      fill: plate.fillColor
    },
    waveStyle: {
      fill: plate.fillColor
    },
    textStyle: {
      fill: plate.fontColor,
      fontFamily: 'Arial'
    },
    waveTextStyle: {
      fill: plate.fontColor,
      fontFamily: 'Arial'
    }
  }));
};

ProgressChart.defaultProps = {
  percent: '%',
  riseAnimation: true,
  waveAnimation: true,
  waveFrequency: 1,
  waveAmplitude: 3,
  fillColor: '#000000'
};
var _default = ProgressChart;
exports.default = _default;
//# sourceMappingURL=ProgressChart.js.map