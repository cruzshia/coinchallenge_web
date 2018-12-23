"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _icons = require("@material-ui/icons");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _logo = _interopRequireDefault(require("../../images/logo.png"));

var _reactRedux = require("react-redux");

var _action = require("../../epics/challengeGroupEpic/action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = (0, _styledComponents.default)('form')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center'
});
var Styles = {
  marginTop: '30px',
  minWidth: '400px',
  '@media only screen and (max-width: 480px)': {
    width: '95%',
    minWidth: '0'
  }
};
var Icon = (0, _styledComponents.default)('img')({
  margin: '20px 0',
  maxWidth: '200px'
});
var LabelTxt = (0, _styledComponents.default)('span')({
  fontSize: '20px'
});

function Label(_ref) {
  var text = _ref.text;
  return _react.default.createElement(LabelTxt, null, text);
}

var mapStateToProps = function mapStateToProps(state) {
  var commonReducer = state.get('common');
  return {
    contract: commonReducer.get('contract'),
    createResult: state.get('challengeGroup')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispath) {
  return {
    newChallengeGroup: function newChallengeGroup(payload) {
      return dispath((0, _action.newChallengeGroup)(payload));
    }
  };
};

var CreateChallengeGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CreateChallengeGroup, _React$Component);

  function CreateChallengeGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateChallengeGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateChallengeGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      challengeGroup: {
        id: '',
        name: '',
        url: '',
        minDays: '',
        maxDays: '',
        maxDelayDays: '',
        minAmount: ''
      },
      error: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDayChange", function (key) {
      return function (e) {
        var val = e.currentTarget.value;
        var _this$state = _this.state,
            challengeGroup = _this$state.challengeGroup,
            error = _this$state.error;
        challengeGroup[key] = val;
        var numVal = Number(val);
        error[key] = !(numVal >= 12 && numVal <= 90);

        if (key === 'maxDays') {
          error[key] = !error[key] && numVal < Number(challengeGroup.minDays);
        }

        _this.setState({
          challengeGroup: _objectSpread({}, challengeGroup),
          error: _objectSpread({}, error)
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDelayDayChange", function (e) {
      var val = e.currentTarget.value;
      var _this$state2 = _this.state,
          challengeGroup = _this$state2.challengeGroup,
          error = _this$state2.error;
      challengeGroup.maxDelayDays = val;
      error.maxDelayDays = !(Number(val) >= 0 && Number(val) <= 90);

      _this.setState({
        challengeGroup: _objectSpread({}, challengeGroup),
        error: _objectSpread({}, error)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (field) {
      return function (e) {
        var val = e.currentTarget.value;
        var challengeGroup = _this.state.challengeGroup;
        challengeGroup[field] = val;

        _this.setState({
          challengeGroup: challengeGroup
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function () {
      _this.props.newChallengeGroup(_this.state.challengeGroup);
    });

    return _this;
  }

  _createClass(CreateChallengeGroup, [{
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          challengeGroup = _this$state3.challengeGroup,
          error = _this$state3.error;
      return _react.default.createElement(Form, {
        noValidate: true,
        autoComplete: "off"
      }, _react.default.createElement(Icon, {
        src: _logo.default
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Challenge Group id"
        }),
        margin: "normal",
        variant: "outlined",
        placeholder: "e.g: com.coin.challenge",
        value: challengeGroup.id,
        onChange: this.onChange('id'),
        error: error.id,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Challenge Group name"
        }),
        margin: "normal",
        variant: "outlined",
        value: challengeGroup.name,
        onChange: this.onChange('name'),
        error: error.name,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Cover image url"
        }),
        margin: "normal",
        variant: "outlined",
        value: challengeGroup.url,
        onChange: this.onChange('url'),
        error: error.url,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Min days"
        }),
        type: "number",
        margin: "normal",
        variant: "outlined",
        placeholder: "12 - 90",
        value: challengeGroup.minDays,
        error: error.minDays,
        onChange: this.onDayChange('minDays'),
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Max days"
        }),
        type: "number",
        margin: "normal",
        variant: "outlined",
        value: challengeGroup.maxDays,
        error: error.maxDays,
        onChange: this.onDayChange('maxDays'),
        placeholder: "12 - 90",
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Max delay days"
        }),
        type: "number",
        margin: "normal",
        value: challengeGroup.maxDelayDays,
        onChange: this.onDelayDayChange,
        error: error.maxDelayDays,
        variant: "outlined",
        placeholder: "< 90 (day)",
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: "Min Challenge Coin"
        }),
        type: "number",
        margin: "normal",
        value: challengeGroup.minAmount,
        onChange: this.onChange('minAmount'),
        error: error.minAmount,
        variant: "outlined",
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement("br", null), _react.default.createElement(_Button.default, {
        variant: "contained",
        color: "default",
        onClick: this.onSubmit
      }, "Create", _react.default.createElement(_icons.TouchApp, null)));
    }
  }]);

  return CreateChallengeGroup;
}(_react.default.Component);

_defineProperty(CreateChallengeGroup, "LabelProp", {
  shrink: true
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateChallengeGroup);

exports.default = _default;
//# sourceMappingURL=CreateChallengeGroup.js.map