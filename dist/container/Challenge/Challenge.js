"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHelmet = require("react-helmet");

var _ChallengeCard = _interopRequireDefault(require("./components/ChallengeCard"));

var _ChallengeInfo = _interopRequireDefault(require("./components/ChallengeInfo"));

var _CrowdInfo = _interopRequireDefault(require("./components/CrowdInfo"));

var _Sponsers = _interopRequireDefault(require("./components/Sponsers"));

var _themeColor = require("../../contants/themeColor");

var _HistoryTimeline = _interopRequireDefault(require("./components/HistoryTimeline"));

var _common = require("../../contants/common");

var _action = require("../../epics/challengeEpic/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background: ", ";\n  justify-content: center;\n  align-items: center;\n  @media (max-width: ", ") {\n    flex-direction: column;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChallengeContainer = (0, _styledComponents.default)('div')(_defineProperty({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  marginTop: 0
}));
var StyledGridList = (0, _styledComponents.default)('div')(_defineProperty({
  width: 800,
  zIndex: 1
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));
var StyledInfoCtr = (0, _styledComponents.default)('div')(_templateObject(), function (props) {
  return props.bgcolor ? props.bgcolor : _themeColor.APP_THEME_BACKGROUND;
}, _common.breakPoint);
var Grid = (0, _styledComponents.default)('div')(_defineProperty({
  width: '50%',
  paddingBottom: '10px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));

var mapStateToProps = function mapStateToProps(state) {
  var challengeState = state.get('challenge');
  var commonState = state.get('common');
  return _objectSpread({
    contract: commonState.get('contract')
  }, challengeState.toJS());
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
  return {
    fetchChallenge: function fetchChallenge(data) {
      return dispatch((0, _action.getChallenge)({
        groupId: data.groupId,
        challenger: data.address
      }));
    }
  };
};

var Challenge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Challenge, _React$Component);

  function Challenge(props) {
    var _this;

    _classCallCheck(this, Challenge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Challenge).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "address", '');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "groupId", '');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetched", false);

    var params = _this.props.match.params;
    _this.address = params.address;
    _this.groupId = params.groupId;
    return _this;
  }

  _createClass(Challenge, [{
    key: "checkAndFetch",
    value: function checkAndFetch() {
      if (this.props.contract && !this.fetched) {
        this.props.fetchChallenge({
          address: this.address,
          groupId: this.groupId
        });
        this.fetched = true;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkAndFetch();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkAndFetch();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          completeDays = _this$props.completeDays,
          totalDays = _this$props.totalDays,
          targetDays = _this$props.targetDays,
          startDayTimestamp = _this$props.startDayTimestamp;
      var percent = Math.floor(completeDays * 100 / targetDays);
      percent = percent > 100 ? 100 : percent;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ChallengeContainer, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, this.address, "'s coin challenge"), _react.default.createElement("link", {
        rel: "canonical",
        href: "http://mysite.com/example"
      })), _react.default.createElement(StyledGridList, null, _react.default.createElement(_ChallengeCard.default, {
        address: this.address,
        groupId: this.groupId,
        startDayTimestamp: startDayTimestamp
      }), _react.default.createElement(StyledInfoCtr, null, _react.default.createElement(Grid, null, _react.default.createElement(_ChallengeInfo.default, {
        completeDays: completeDays,
        totalDays: totalDays,
        targetDays: targetDays,
        percent: percent
      })), _react.default.createElement(Grid, null, _react.default.createElement(_CrowdInfo.default, null))), _react.default.createElement(_Sponsers.default, null), _react.default.createElement(_HistoryTimeline.default, null))));
    }
  }]);

  return Challenge;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)(Challenge);

exports.default = _default;
//# sourceMappingURL=Challenge.js.map