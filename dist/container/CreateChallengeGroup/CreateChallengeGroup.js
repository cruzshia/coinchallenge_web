"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _logo = _interopRequireDefault(require("../../images/logo.png"));

var _reactRedux = require("react-redux");

var _action = require("../../epics/challengeGroupEpic/action");

var _action2 = require("../../epics/commonEpic/action");

var _reactIntl = require("react-intl");

var _Transaction = _interopRequireDefault(require("../../components/Transaction"));

var _themeColor = require("../../contants/themeColor");

var _utils = require("../../utils");

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _OutlinedInput = _interopRequireDefault(require("@material-ui/core/OutlinedInput"));

var _web = _interopRequireDefault(require("web3"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = (0, _styledComponents.default)('form')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  '.textField': {
    background: '#fff',
    zIndex: 1,
    '&:focus label': {
      color: "".concat(_themeColor.APP_THEME, " !important")
    }
  },
  '.button': {
    backgroundColor: _themeColor.APP_THEME,
    color: '#fff',
    padding: '0 40px',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: _themeColor.APP_THEME,
      opacity: 0.9
    }
  }
});
var Styles = {
  marginTop: '30px',
  width: '100%',
  maxWidth: '400px'
};
var Icon = (0, _styledComponents.default)('img')({
  margin: '20px 0',
  maxWidth: '200px',
  zIndex: 1
});
var LabelTxt = (0, _styledComponents.default)('span')({
  fontSize: '20px'
});
var WaitingBlk = (0, _styledComponents.default)('div')({
  zIndex: 1,
  marginBottom: '10px',
  width: '100%',
  textAlign: 'center'
});
var FormStyle = {
  maxWidth: '400px',
  margin: '20px 0 10px',
  backgroundColor: '#fff'
};
var MenuStyle = {
  style: {
    maxHeight: '300px',
    padding: '0 10px'
  }
};
var SelectStyle = {
  padding: '0 10px 0 15px'
};

function Label(_ref) {
  var text = _ref.text;
  return _react.default.createElement(LabelTxt, null, text);
}

var defaultGroupState = {
  id: '',
  name: '',
  url: '',
  minDays: '0',
  maxDays: '0',
  maxDelayDays: '7',
  minAmount: ''
};

var mapStateToProps = function mapStateToProps(state) {
  var commonReducer = state.get('common');
  return {
    contract: commonReducer.get('contract'),
    isConfirming: commonReducer.get('isConfirming'),
    txHash: commonReducer.get('txHash'),
    createResult: state.get('challengeGroup')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    checkWallet: function checkWallet() {
      return dispatch((0, _action2.checkWallet)());
    },
    setPopup: function setPopup(payload) {
      return dispatch((0, _action2.setPopup)(payload));
    },
    setCreateResult: function setCreateResult(payload) {
      return dispatch((0, _action.setCreateResult)(payload));
    },
    newChallengeGroup: function newChallengeGroup(payload) {
      dispatch((0, _action.newChallengeGroup)(_objectSpread({}, payload, {
        dispatch: dispatch
      })));
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
      challengeGroup: _objectSpread({}, defaultGroupState),
      error: {
        minDays: true,
        maxDays: true
      },
      agent: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTextChange", function (key) {
      return function (e) {
        var val = e.currentTarget.value;
        var _this$state = _this.state,
            challengeGroup = _this$state.challengeGroup,
            error = _this$state.error;
        challengeGroup[key] = val;
        error[key] = val.length <= 0;

        _this.setState({
          challengeGroup: _objectSpread({}, challengeGroup),
          error: _objectSpread({}, error)
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDayChange", function (key) {
      return function (e) {
        var val = e.target.value;
        var _this$state2 = _this.state,
            challengeGroup = _this$state2.challengeGroup,
            error = _this$state2.error;
        challengeGroup[key] = val;

        if (Number(challengeGroup['maxDays']) < Number(challengeGroup['minDays'])) {
          challengeGroup['maxDays'] = challengeGroup['minDays'];
        }

        error['minDays'] = Number(challengeGroup['minDays']) <= 0;
        error['maxDays'] = Number(challengeGroup['maxDays']) <= 0;

        _this.setState({
          challengeGroup: _objectSpread({}, challengeGroup),
          error: _objectSpread({}, error)
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDelayDayChange", function (e) {
      var val = e.target.value;
      var _this$state3 = _this.state,
          challengeGroup = _this$state3.challengeGroup,
          error = _this$state3.error;
      challengeGroup.maxDelayDays = val;

      _this.setState({
        challengeGroup: _objectSpread({}, challengeGroup),
        error: _objectSpread({}, error)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAmountChange", function (field) {
      return function (e) {
        var val = e.currentTarget.value;
        var _this$state4 = _this.state,
            challengeGroup = _this$state4.challengeGroup,
            error = _this$state4.error;
        challengeGroup[field] = val;
        error[field] = Number(val) <= 0;

        _this.setState({
          challengeGroup: challengeGroup,
          error: error
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onUrlChange", function (e) {
      var val = e.currentTarget.value;
      var _this$state5 = _this.state,
          challengeGroup = _this$state5.challengeGroup,
          error = _this$state5.error;
      challengeGroup['url'] = val;
      error['url'] = !(0, _utils.isUrlValid)(val);

      _this.setState({
        challengeGroup: _objectSpread({}, challengeGroup),
        error: _objectSpread({}, error)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAgentChange", function (e) {
      var val = e.currentTarget.value;
      var isEmpty = val === '';
      var error = _this.state.error;
      error['agent'] = !isEmpty && !_web.default.utils.isAddress(val);

      _this.setState({
        agent: val,
        error: _objectSpread({}, error)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function () {
      var hasError = Object.keys(_this.state.error).length === 0;

      for (var field in _this.state.error) {
        hasError = hasError || _this.state.error[field];
      }

      if (hasError) {
        _this.props.setPopup({
          showPop: true,
          messageKey: 'createDataError'
        });

        return;
      }

      _this.props.checkWallet();

      _this.props.newChallengeGroup(_objectSpread({}, _this.state.challengeGroup, {
        agent: _this.state.agent
      }));
    });

    return _this;
  }

  _createClass(CreateChallengeGroup, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var response = this.props.createResult.get('response');

      if (response.status) {
        this.props.setCreateResult({
          response: {},
          error: false
        });
        this.setState({
          challengeGroup: defaultGroupState,
          agent: ''
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          history = _this$props.history,
          location = _this$props.location;
      (0, _utils.changeRoute)({
        history: history,
        location: location,
        match: {}
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state6 = this.state,
          challengeGroup = _this$state6.challengeGroup,
          error = _this$state6.error,
          agent = _this$state6.agent;
      var _this$props2 = this.props,
          intl = _this$props2.intl,
          isConfirming = _this$props2.isConfirming,
          txHash = _this$props2.txHash;
      return _react.default.createElement(Form, {
        noValidate: true,
        autoComplete: "off",
        style: {
          padding: '0 10px'
        }
      }, _react.default.createElement(Icon, {
        src: _logo.default
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: intl.formatMessage({
            id: 'challengeGroupId'
          })
        }),
        className: "textField",
        margin: "normal",
        variant: "outlined",
        placeholder: "e.g: com.coin.challenge",
        value: challengeGroup.id,
        onChange: this.onTextChange('id'),
        error: error.id,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: intl.formatMessage({
            id: 'challengeGroupName'
          })
        }),
        className: "textField",
        margin: "normal",
        variant: "outlined",
        value: challengeGroup.name,
        onChange: this.onTextChange('name'),
        error: error.name,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: intl.formatMessage({
            id: 'challengeGroupCover'
          })
        }),
        className: "textField",
        margin: "normal",
        variant: "outlined",
        value: challengeGroup.url,
        onChange: this.onUrlChange,
        error: error.url,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_FormControl.default, {
        variant: "outlined",
        fullWidth: true,
        style: FormStyle,
        required: true
      }, _react.default.createElement(_InputLabel.default, {
        htmlFor: "outlined-age-simple"
      }, intl.formatMessage({
        id: 'minChallengeDays'
      }), ' '), _react.default.createElement(_Select.default, {
        MenuProps: MenuStyle,
        value: challengeGroup.minDays,
        onChange: this.onDayChange('minDays'),
        style: SelectStyle,
        input: _react.default.createElement(_OutlinedInput.default, {
          labelWidth: 150
        })
      }, new Array(79).fill(0).map(function (_data, index) {
        return _react.default.createElement(_MenuItem.default, {
          key: "option-".concat(index),
          value: index + 12
        }, index + 12);
      }))), _react.default.createElement(_FormControl.default, {
        variant: "outlined",
        fullWidth: true,
        style: FormStyle,
        required: true
      }, _react.default.createElement(_InputLabel.default, {
        htmlFor: "outlined-age-simple"
      }, intl.formatMessage({
        id: 'maxChallengeDays'
      })), _react.default.createElement(_Select.default, {
        MenuProps: MenuStyle,
        value: challengeGroup.maxDays,
        onChange: this.onDayChange('maxDays'),
        style: SelectStyle,
        input: _react.default.createElement(_OutlinedInput.default, {
          labelWidth: 150
        })
      }, new Array(90 - Number(challengeGroup.minDays) + 1).fill(0).map(function (_data, index) {
        return _react.default.createElement(_MenuItem.default, {
          key: "option-max-".concat(index),
          value: (Number(challengeGroup.minDays) || 12) + index
        }, (Number(challengeGroup.minDays) || 12) + index);
      }))), _react.default.createElement(_FormControl.default, {
        variant: "outlined",
        fullWidth: true,
        style: FormStyle,
        required: true
      }, _react.default.createElement(_InputLabel.default, {
        htmlFor: "outlined-age-simple"
      }, intl.formatMessage({
        id: 'maxDelayDays'
      })), _react.default.createElement(_Select.default, {
        MenuProps: MenuStyle,
        value: challengeGroup.maxDelayDays,
        onChange: this.onDelayDayChange,
        style: SelectStyle,
        input: _react.default.createElement(_OutlinedInput.default, {
          labelWidth: 140
        })
      }, new Array(90).fill(0).map(function (_data, index) {
        return _react.default.createElement(_MenuItem.default, {
          key: "option-delay-".concat(index),
          value: index + 1
        }, index + 1);
      }))), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: intl.formatMessage({
            id: 'minChallengeAmount'
          })
        }),
        className: "textField",
        type: "number",
        margin: "normal",
        value: challengeGroup.minAmount,
        onChange: this.onAmountChange('minAmount'),
        error: error.minAmount,
        variant: "outlined",
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles,
        required: true
      }), _react.default.createElement(_TextField.default, {
        label: _react.default.createElement(Label, {
          text: intl.formatMessage({
            id: 'agent'
          })
        }),
        className: "textField",
        margin: "normal",
        variant: "outlined",
        placeholder: "e.g 0xa99CeB4475670cCDF31a78232bfA585848598cBA",
        value: agent,
        onChange: this.onAgentChange,
        error: error.agent,
        InputLabelProps: CreateChallengeGroup.LabelProp,
        style: Styles
      }), _react.default.createElement("br", null), isConfirming ? _react.default.createElement(WaitingBlk, null, _react.default.createElement(_Transaction.default, {
        txHash: txHash,
        classNames: "progress"
      })) : null, _react.default.createElement(_Button.default, {
        variant: "contained",
        className: "button",
        onClick: this.onSubmit
      }, intl.formatMessage({
        id: 'create'
      })));
    }
  }]);

  return CreateChallengeGroup;
}(_react.default.Component);

_defineProperty(CreateChallengeGroup, "LabelProp", {
  shrink: true
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactIntl.injectIntl)(CreateChallengeGroup));

exports.default = _default;