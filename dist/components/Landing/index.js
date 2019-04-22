"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StyleId = 'landing-link';

var Landing =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Landing, _React$PureComponent);

  function Landing() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Landing);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Landing)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ref", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "headerRef", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scriptRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scriptRef2", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      show: false
    });

    return _this;
  }

  _createClass(Landing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (process.browser) {
        this.headerRef = document.getElementById('project-header');
        this.ref = document.getElementById('particle-body');

        if (this.ref && this.headerRef) {
          this.ref.style.visibility = 'hidden';
          this.headerRef.style.visibility = 'hidden';
        }

        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '/landing/styles/layout.css';
        link.id = StyleId; // MAGIC

        link.onload = function () {
          _this2.setState({
            show: true
          });
        };

        head.appendChild(link);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (process.browser) {
        var LinkDom = document.getElementById(StyleId);
        LinkDom && LinkDom.remove();
      }

      if (this.ref && this.headerRef) {
        this.ref.style.visibility = 'visible';
        this.headerRef.style.visibility = 'visible';
      }

      if (this.scriptRef.current && this.scriptRef2.current) {
        this.scriptRef.current.remove();
        this.scriptRef2.current.remove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var intl = this.props.intl;
      return _react.default.createElement("div", {
        className: "imageWrapper"
      }, _react.default.createElement("div", {
        className: "headerBackground"
      }, _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("header", null, _react.default.createElement("div", {
        className: "logo"
      }, _react.default.createElement("div", {
        className: "appIconShadow"
      }, _react.default.createElement("svg", {
        width: 0,
        height: 0
      }, _react.default.createElement("defs", null, _react.default.createElement("clipPath", {
        id: "shape"
      }, _react.default.createElement("path", {
        id: "shape",
        className: "cls-1",
        d: "M6181.23,233.709v-1.792c0-.5-0.02-1-0.02-1.523a24.257,24.257,0,0,0-.28-3.3,11.207,11.207,0,0,0-1.04-3.132,10.683,10.683,0,0,0-1.95-2.679,10.384,10.384,0,0,0-2.68-1.943,10.806,10.806,0,0,0-3.13-1.038,19.588,19.588,0,0,0-3.3-.285c-0.5-.017-1-0.017-1.52-0.017h-22.39c-0.51,0-1.01.017-1.53,0.017a24.041,24.041,0,0,0-3.3.285,11.009,11.009,0,0,0-3.13,1.038,10.491,10.491,0,0,0-4.62,4.622,10.893,10.893,0,0,0-1.04,3.132,19.2,19.2,0,0,0-.28,3.3c-0.02.5-.02,1-0.02,1.523v22.392c0,0.5.02,1,.02,1.524a24.257,24.257,0,0,0,.28,3.3,10.9,10.9,0,0,0,1.04,3.132,10.491,10.491,0,0,0,4.62,4.622,11.04,11.04,0,0,0,3.13,1.038,19.891,19.891,0,0,0,3.3.285c0.51,0.017,1.01.017,1.53,0.017h22.39c0.5,0,1-.017,1.52-0.017a24.221,24.221,0,0,0,3.3-.285,10.836,10.836,0,0,0,3.13-1.038,10.408,10.408,0,0,0,2.68-1.943,10.683,10.683,0,0,0,1.95-2.679,11.217,11.217,0,0,0,1.04-3.132,20.257,20.257,0,0,0,.28-3.3c0.02-.5.02-1,0.02-1.524v-20.6h0Z",
        transform: "translate(-6131 -218)"
      })))), _react.default.createElement("img", {
        className: "headerIcon",
        src: "landing/assets/logo.png"
      })), _react.default.createElement("p", {
        className: "headerName"
      }, "CoinChallenges")), _react.default.createElement("nav", null, _react.default.createElement("ul", null))), _react.default.createElement("div", {
        className: "iphonePreview"
      }, _react.default.createElement("svg", {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        viewBox: "0 0 0 0",
        style: {
          position: 'absolute'
        }
      }, _react.default.createElement("clipPath", {
        id: "screenMask",
        clipPathUnits: "objectBoundingBox",
        transform: "scale(0.00257, 0.00119)"
      }, _react.default.createElement("path", {
        d: "M6490.24,1234.36H6216.28c-2.57,0-10.55-.07-12.07-0.07a87.524,87.524,0,0,1-12-1.03,40.051,40.051,0,0,1-11.4-3.79,38.315,38.315,0,0,1-16.82-16.84,39.948,39.948,0,0,1-3.78-11.42,72.257,72.257,0,0,1-1.04-12.02c-0.06-1.83-.06-5.56-0.06-5.56V452.125h0s0.06-11.391.06-12.086a87.9,87.9,0,0,1,1.04-12.025,39.843,39.843,0,0,1,3.78-11.413,38.283,38.283,0,0,1,16.82-16.847,39.762,39.762,0,0,1,11.4-3.785,71.909,71.909,0,0,1,12-1.037c16.99-.567,36.32-0.061,34.51-0.061,5.02,0,6.5,3.439,6.63,6.962a35.611,35.611,0,0,0,1.2,8.156,21.326,21.326,0,0,0,19.18,15.592c2.28,0.192,6.78.355,6.78,0.355H6433.7s4.5-.059,6.79-0.251a21.348,21.348,0,0,0,19.18-15.591,35.582,35.582,0,0,0,1.19-8.154c0.13-3.523,1.61-6.962,6.64-6.962-1.81,0,17.52-.5,34.5.061a71.923,71.923,0,0,1,12.01,1.038,39.832,39.832,0,0,1,11.4,3.784,38.283,38.283,0,0,1,16.82,16.844,40.153,40.153,0,0,1,3.78,11.413,87.844,87.844,0,0,1,1.03,12.023c0,0.695.06,12.084,0.06,12.084h0V1183.64s0,3.72-.06,5.55a72.366,72.366,0,0,1-1.03,12.03,40.2,40.2,0,0,1-3.78,11.41,38.315,38.315,0,0,1-16.82,16.84,40.155,40.155,0,0,1-11.4,3.79,87.669,87.669,0,0,1-12.01,1.03c-1.52,0-9.5.07-12.07,0.07",
        transform: "translate(-6159.12 -394.656)"
      }))), _react.default.createElement("img", {
        className: "iphoneScreen",
        src: "landing/assets/screenshot/1.png",
        alt: ""
      })), _react.default.createElement("div", {
        className: "appInfo"
      }, _react.default.createElement("div", {
        className: "appIconShadow"
      }, _react.default.createElement("svg", {
        width: 0,
        height: 0
      }, _react.default.createElement("defs", null, _react.default.createElement("clipPath", {
        id: "shape120"
      }, _react.default.createElement("path", {
        id: "shape",
        className: "cls-1",
        d: "M6821,495.533v-4.281c0-1.2-.04-2.4-0.04-3.642a57.7,57.7,0,0,0-.68-7.882,26.144,26.144,0,0,0-2.48-7.483,25.115,25.115,0,0,0-11.04-11.044,26.118,26.118,0,0,0-7.49-2.481,47.28,47.28,0,0,0-7.88-.68c-1.2-.04-2.4-0.04-3.64-0.04h-53.5c-1.2,0-2.4.04-3.64,0.04a57.813,57.813,0,0,0-7.88.68,26.323,26.323,0,0,0-7.49,2.481,25.115,25.115,0,0,0-11.04,11.044,26.144,26.144,0,0,0-2.48,7.483,47.313,47.313,0,0,0-.68,7.882c-0.04,1.2-.04,2.4-0.04,3.642v53.5c0,1.2.04,2.4,0.04,3.641a57.7,57.7,0,0,0,.68,7.883,26.137,26.137,0,0,0,2.48,7.482,25.115,25.115,0,0,0,11.04,11.044,26.261,26.261,0,0,0,7.49,2.481,47.28,47.28,0,0,0,7.88.68c1.2,0.04,2.4.04,3.64,0.04h53.5c1.2,0,2.4-.04,3.64-0.04a57.654,57.654,0,0,0,7.88-.68,26.057,26.057,0,0,0,7.49-2.481,25.115,25.115,0,0,0,11.04-11.044,26.137,26.137,0,0,0,2.48-7.482,47.316,47.316,0,0,0,.68-7.883c0.04-1.2.04-2.4,0.04-3.641V495.533h0Z",
        transform: "translate(-6701 -458)",
        filter: "url(#f1)"
      })))), _react.default.createElement("img", {
        className: "appIconLarge",
        src: "landing/assets/logo.png"
      })), _react.default.createElement("div", {
        className: "appNamePriceContainer"
      }, _react.default.createElement("h1", {
        className: "appName"
      }, "CoinChallenges"), _react.default.createElement("h2", {
        className: "appPrice"
      }, "$Free")), _react.default.createElement("div", {
        className: "appDescriptionContainer"
      }, _react.default.createElement("p", {
        className: "appDescription"
      }, "According to behavioral psychology, it takes 21 ~ 90 days to form a new habit. CoinChallenges let you form habits effortlessly by using cryptocurrency.")), _react.default.createElement("div", {
        className: "downloadButtonsContainer"
      }, _react.default.createElement("a", {
        className: "appStoreLink",
        href: "https://itunes.apple.com/app/coinchallenges/id1452171308",
        target: "_blank"
      }, _react.default.createElement("img", {
        className: "appStore",
        src: "/landing/assets/appstore.png"
      })))), _react.default.createElement("div", {
        className: "features"
      }, _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop fas fa-dumbbell fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Form Habits"), _react.default.createElement("p", null, "Set up how many days do you want to form a habit."))), _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop fab fa-bitcoin fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Gamification"), _react.default.createElement("p", null, "Put your cryptocurrency into smart contract. The more cryptocurrency you put in, the more likely you will be to achieve the goal!"))), _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop far fa-gem fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Earn Cryptocurrency"), _react.default.createElement("p", null, "After you succeed, you can get back all of your cryptocurrency and also can get sponsors from your friends."))), _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop fas fa-reply fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Social Sharing"), _react.default.createElement("p", null, "Share your challenge via social media and let friends encourage you."))), _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop fas fa-child fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Sponsor"), _react.default.createElement("p", null, "Sponsor friends' challenges. Change together."))), _react.default.createElement("div", {
        className: "feature"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "iconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "iconTop fas fa-check-circle fa-stack-1x"
      }))), _react.default.createElement("div", {
        className: "featureText"
      }, _react.default.createElement("h3", null, "Secure"), _react.default.createElement("p", null, "Verified trusted smart contract ensures your cryptocurrency is secure.")))), _react.default.createElement("footer", null, _react.default.createElement("div", {
        className: "footerIcons"
      }, _react.default.createElement("a", {
        href: "https://twitter.com/coin_challenges"
      }, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "socialIconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "socialIconTop fab fa-twitter fa-stack-1x"
      }))), _react.default.createElement("a", {
        href: "https://t.me/CoinChallenges"
      }, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "socialIconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "socialIconTop fab fa-telegram fa-stack-1x"
      }))), _react.default.createElement("a", {
        href: "https://line.me/R/ti/p/%40xny8263g"
      }, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "socialIconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "socialIconTop fab fa-line fa-stack-1x"
      }))), _react.default.createElement("a", {
        href: "mailto:hello@coinchallenges.app"
      }, _react.default.createElement("span", {
        className: "fa-stack fa-1x"
      }, _react.default.createElement("i", {
        className: "socialIconBack fas fa-circle fa-stack-2x"
      }), _react.default.createElement("i", {
        className: "socialIconTop fas fa-envelope fa-stack-1x"
      }))))))));
    }
  }]);

  return Landing;
}(_react.default.PureComponent);

var _default = (0, _reactIntl.injectIntl)(Landing);

exports.default = _default;