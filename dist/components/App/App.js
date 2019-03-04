"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Home = _interopRequireDefault(require("../../container/Home"));

var _Landing = _interopRequireDefault(require("../Landing"));

var _CreateChallengeGroup = _interopRequireDefault(require("../../container/CreateChallengeGroup"));

var _Challenge = _interopRequireDefault(require("../../container/Challenge"));

var _translation = _interopRequireDefault(require("../../translation"));

var _styles = require("@material-ui/core/styles");

var _themeColor = require("../../contants/themeColor");

var _common = require("../../contants/common");

require("reset-css");

require("./app.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      main: _themeColor.APP_THEME,
      light: _themeColor.APP_THEME,
      dark: _themeColor.APP_THEME
    }
  },
  typography: {
    useNextVariants: true
  }
});
var Body = (0, _styledComponents.default)('div')({
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  background: _themeColor.APP_FONT_COLOR,
  minHeight: '100vh'
});
var MainContainer = (0, _styledComponents.default)('div')(_defineProperty({
  margin: '0 auto 40px',
  paddingTop: 60
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  paddingTop: 50
}));

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var jssStyles = document.getElementById('jss-ssr');
      jssStyles && jssStyles.remove();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_styles.MuiThemeProvider, {
        theme: theme
      }, _react.default.createElement(Body, null, _react.default.createElement(MainContainer, null, _react.default.createElement(_Home.default, null), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        path: "/",
        exact: true,
        component: _Landing.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/group/create",
        exact: true,
        component: _CreateChallengeGroup.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/challenge/:groupId/:address/:round?",
        component: _Challenge.default
      }), _react.default.createElement(_reactRouterDom.Route, {
        component: function component() {
          return _react.default.createElement(_reactRouterDom.Redirect, {
            to: "/"
          });
        }
      })))));
    }
  }]);

  return App;
}(_react.Component);

var _default = (0, _styles.withTheme)()((0, _reactRouterDom.withRouter)((0, _translation.default)(App)));

exports.default = _default;