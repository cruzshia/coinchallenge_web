"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _action = require("../../epics/commonEpic/action");

var _Header = _interopRequireDefault(require("../../components/Header"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StyledParticle = (0, _styledComponents.default)('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    data: state.get('common')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispath) {
  return {
    initContract: function initContract() {
      return dispath((0, _action.initContract)());
    },
    closePopup: function closePopup() {
      return dispath((0, _action.setPopup)({
        showPop: false
      }));
    }
  };
};

var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (process.browser) {
                  require('particles.js');

                  window.particlesJS.load('particle-body', '/particlesjs-config.json');
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          intl = _this$props.intl,
          closePopup = _this$props.closePopup;
      var _ref = [data.get('popMessage'), data.get('messageKey')],
          popMessage = _ref[0],
          messageKey = _ref[1];
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(StyledParticle, {
        id: "particle-body"
      }), _react.default.createElement(_Header.default, {
        title: "CoinChallenges"
      }), _react.default.createElement(_Dialog.default, {
        open: data.get('showPop'),
        keepMounted: true,
        onClose: closePopup,
        "aria-labelledby": "alert-dialog-slide-title",
        "aria-describedby": "alert-dialog-slide-description"
      }, _react.default.createElement(_DialogContent.default, {
        style: {
          wordBreak: 'break-all'
        }
      }, _react.default.createElement(_DialogContentText.default, {
        id: "alert-dialog-slide-description"
      }, messageKey ? intl.formatMessage({
        id: messageKey
      }) : popMessage)), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
        onClick: closePopup,
        color: "primary"
      }, intl.formatMessage({
        id: 'ok'
      })))));
    }
  }]);

  return Home;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactIntl.injectIntl)(Home));

exports.default = _default;