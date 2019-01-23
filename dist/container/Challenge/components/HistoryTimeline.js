"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _themeColor = require("../../../contants/themeColor");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactIntl = require("react-intl");

var _reactD3Components = require("react-d3-components");

var _contractService = require("../../../contracts/contractService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STATUS = ['Succeeded', 'Failed', 'Aborted'];
var TimelineCtr = (0, _styledComponents.default)('div')({
  background: _themeColor.APP_LIGHT_BG,
  display: 'flex',
  justifyContent: 'center',
  text: {
    color: _themeColor.APP_FONT_COLOR_DARK
  }
});

function color(label) {
  if (label.indexOf('success') >= 0) {
    return '#ff7473';
  } else if (label.indexOf('failed') >= 0) {
    return '#47b8e0';
  }

  return '#ffc952';
}

var HistoryTimeline =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(HistoryTimeline, _React$PureComponent);

  function HistoryTimeline() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HistoryTimeline);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HistoryTimeline)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetched", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      challengesStatus: {
        values: []
      }
    });

    return _this;
  }

  _createClass(HistoryTimeline, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props, contract, challenger, _values, pastStatus, i;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, contract = _this$props.contract, challenger = _this$props.challenger;

                if (!(contract && !this.fetched)) {
                  _context.next = 9;
                  break;
                }

                this.fetched = true;
                _values = [];
                _context.next = 6;
                return (0, _contractService.getPastChallenges)({
                  contract: contract,
                  challenger: challenger
                });

              case 6:
                pastStatus = _context.sent;

                for (i = 0; i < pastStatus.length; i++) {
                  if (pastStatus[i]) {
                    _values.push({
                      x: STATUS[i],
                      y: pastStatus[i]
                    });
                  }
                }

                this.setState({
                  challengesStatus: {
                    values: _values
                  }
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate() {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "render",
    value: function render() {
      var challengesStatus = this.state.challengesStatus;

      if (!challengesStatus.values.length) {
        return null;
      }

      return _react.default.createElement(TimelineCtr, null, _react.default.createElement(_reactD3Components.PieChart, {
        data: this.state.challengesStatus,
        colorScale: function colorScale(label) {
          return color(label);
        },
        x: function x(data) {
          return "".concat(data.x, ":").concat(data.y);
        },
        width: 600,
        height: 400,
        margin: {
          top: 10,
          bottom: 10,
          left: 100,
          right: 100
        },
        fill: "red",
        string: true,
        tooltipHtml: function tooltipHtml(x) {
          return _react.default.createElement("span", {
            style: {
              color: '#34314c'
            }
          }, x);
        }
      }));
    }
  }]);

  return HistoryTimeline;
}(_react.default.PureComponent);

var _default = (0, _reactIntl.injectIntl)(HistoryTimeline);

exports.default = _default;