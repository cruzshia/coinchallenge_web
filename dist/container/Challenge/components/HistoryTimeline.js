"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactVerticalTimelineComponent = require("react-vertical-timeline-component");

require("react-vertical-timeline-component/style.min.css");

var _themeColor = require("../../../contants/themeColor");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Beenhere = _interopRequireDefault(require("@material-ui/icons/Beenhere"));

var _Terrain = _interopRequireDefault(require("@material-ui/icons/Terrain"));

var _MoodBad = _interopRequireDefault(require("@material-ui/icons/MoodBad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .vertical-timeline-element-content {\n    box-shadow: 0 3px 0 ", "\n  }\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TimelineCtr = (0, _styledComponents.default)('div')({
  '.vertical-timeline::before': {
    background: '#aab9c2'
  }
});
var IconStyle = {
  start: {
    background: _themeColor.APP_THEME,
    color: '#fff',
    shadow: _themeColor.APP_THEME,
    icon: _react.default.createElement(_Terrain.default, null)
  },
  success: {
    background: '#fecd00',
    color: '#fff',
    shadow: '#fecd00',
    icon: _react.default.createElement(_Beenhere.default, null)
  },
  failed: {
    background: '#34495d',
    color: '#fff',
    shadow: '#34495d',
    icon: _react.default.createElement(_MoodBad.default, null)
  }
};
var StyledVerticalTimelineElement = (0, _styledComponents.default)(_reactVerticalTimelineComponent.VerticalTimelineElement)(_templateObject(), function (props) {
  return props.iconStyle.shadow;
});

function HistoryTimeline() {
  return _react.default.createElement(TimelineCtr, null, _react.default.createElement(_reactVerticalTimelineComponent.VerticalTimeline, null, _react.default.createElement(StyledVerticalTimelineElement, {
    iconStyle: IconStyle.success,
    icon: IconStyle.success.icon
  }, _react.default.createElement("h3", {
    className: "vertical-timeline-element-title"
  }, "Finish a walk challenge"), _react.default.createElement("h4", {
    className: "vertical-timeline-element-subtitle"
  }, "2018/12/10"), _react.default.createElement("p", null, "Challenge succeed! Complete rate: 120%")), _react.default.createElement(StyledVerticalTimelineElement, {
    iconStyle: IconStyle.start,
    icon: IconStyle.start.icon
  }, _react.default.createElement("h3", {
    className: "vertical-timeline-element-title"
  }, "Start a walk challenge"), _react.default.createElement("h4", {
    className: "vertical-timeline-element-subtitle"
  }, "2018/12/08"), _react.default.createElement("p", null, "Challenger start a challenge which need complete 10 days in 15 days.", _react.default.createElement("br", null), "0.345 ", process.env.REACT_APP_COIN)), _react.default.createElement(StyledVerticalTimelineElement, {
    iconStyle: IconStyle.failed,
    icon: IconStyle.failed.icon
  }, _react.default.createElement("h3", {
    className: "vertical-timeline-element-title"
  }, "Content Marketing for Web, Mobile and Social Media"), _react.default.createElement("h4", {
    className: "vertical-timeline-element-subtitle"
  }, "Online Course"), _react.default.createElement("p", null, "Strategy, Social Media"))));
}

var _default = HistoryTimeline;
exports.default = _default;
//# sourceMappingURL=HistoryTimeline.js.map