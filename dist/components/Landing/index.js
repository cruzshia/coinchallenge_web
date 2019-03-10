"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _reactIntl = require("react-intl");

var _Language = _interopRequireDefault(require("@material-ui/icons/Language"));

var _reactHelmet = require("react-helmet");

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-top: -60px;\n  opacity: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var imageDir = '/landing/images/';
var LandingCtr = (0, _styledComponents.default)('div')(_templateObject(), function (props) {
  return props.show ? 1 : 0;
});
var StyledUl = (0, _styledComponents.default)('ul')({
  right: 0,
  transform: 'translateX(50%)'
});
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
      return _react.default.createElement(LandingCtr, {
        show: this.state.show
      }, this.state.show ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: "bgded",
        style: {
          backgroundImage: "url(\"".concat(imageDir, "backgrounds/walk.jpg\")")
        }
      }, _react.default.createElement("div", {
        className: "wrapper row1"
      }, _react.default.createElement("header", {
        id: "header",
        className: "hoc clear"
      }, _react.default.createElement("div", {
        id: "logo",
        className: "fl_left"
      }, _react.default.createElement("h1", null, _react.default.createElement("a", {
        href: "/"
      }, "CoinChallenges"))), _react.default.createElement("nav", {
        id: "mainav",
        className: "fl_right"
      }, _react.default.createElement("ul", {
        className: "clear"
      }, _react.default.createElement("li", null, _react.default.createElement("a", {
        className: "drop",
        href: "#"
      }, _react.default.createElement(_Language.default, null)), _react.default.createElement(StyledUl, null, _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
        to: "/?l=zh_TW"
      }, "\u7E41\u9AD4\u4E2D\u6587")), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
        to: "/?l=zh_CN"
      }, "\u7B80\u4F53\u4E2D\u6587")), _react.default.createElement("li", null, _react.default.createElement(_reactRouterDom.Link, {
        to: "/?l=en_US"
      }, "English")))))))), _react.default.createElement("section", {
        id: "pageintro",
        className: "hoc clear"
      }, _react.default.createElement("div", null, _react.default.createElement("h2", {
        className: "heading"
      }, intl.formatMessage({
        id: 'landing.start.title'
      }), _react.default.createElement("br", null), _react.default.createElement("strong", null, intl.formatMessage({
        id: 'landing.start.subtitle'
      }))), _react.default.createElement("p", null, intl.formatMessage({
        id: 'landing.start.desc'
      })), _react.default.createElement("footer", null, _react.default.createElement("ul", {
        className: "nospace inline pushright"
      }, _react.default.createElement("li", null, _react.default.createElement("a", {
        className: "btn",
        href: "#"
      }, intl.formatMessage({
        id: 'download.app'
      })))))))), _react.default.createElement("div", {
        className: "wrapper row3"
      }, _react.default.createElement("main", {
        className: "hoc container clear btmpad-none"
      }, _react.default.createElement("div", {
        className: "sectiontitle center"
      }, _react.default.createElement("h6", {
        className: "heading"
      }, intl.formatMessage({
        id: 'landing.blocks.title'
      })), _react.default.createElement("p", null, intl.formatMessage({
        id: 'landing.blocks.desc'
      }))), _react.default.createElement("ul", {
        className: "nospace group center btmspace-80"
      }, _react.default.createElement("li", {
        className: "one_third first"
      }, _react.default.createElement("article", null, _react.default.createElement("i", {
        className: "btmspace-30 fa fa-3x fa-apple"
      }), _react.default.createElement("h6", {
        className: "heading font-x1"
      }, intl.formatMessage({
        id: 'landing.block1.title'
      })), _react.default.createElement("p", {
        className: "btmspace-30"
      }, intl.formatMessage({
        id: 'landing.block1.desc'
      })))), _react.default.createElement("li", {
        className: "one_third"
      }, _react.default.createElement("article", null, _react.default.createElement("i", {
        className: "btmspace-30 fa fa-3x fa-code"
      }), _react.default.createElement("h6", {
        className: "heading font-x1"
      }, intl.formatMessage({
        id: 'landing.block2.title'
      })), _react.default.createElement("p", {
        className: "btmspace-30"
      }, intl.formatMessage({
        id: 'landing.block2.desc'
      })))), _react.default.createElement("li", {
        className: "one_third"
      }, _react.default.createElement("article", null, _react.default.createElement("i", {
        className: "btmspace-30 fa fa-3x fa-calendar-check-o"
      }), _react.default.createElement("h6", {
        className: "heading font-x1"
      }, intl.formatMessage({
        id: 'landing.block3.title'
      })), _react.default.createElement("p", {
        className: "btmspace-30"
      }, intl.formatMessage({
        id: 'landing.block3.desc'
      }))))), _react.default.createElement("div", {
        className: "clear"
      }))), _react.default.createElement("div", {
        className: "wrapper bgded overlay coloured",
        style: {
          backgroundImage: "url(\"".concat(imageDir, "backgrounds/02.jpg\")")
        }
      }, _react.default.createElement("section", {
        className: "hoc container clear"
      }, _react.default.createElement("div", {
        className: "sectiontitle center"
      }, _react.default.createElement("h6", {
        className: "heading"
      }, intl.formatMessage({
        id: 'section.tips'
      })), _react.default.createElement("p", null, intl.formatMessage({
        id: 'section.tips.desc'
      }))), _react.default.createElement("ul", {
        className: "nospace group infoboxes"
      }, _react.default.createElement("li", {
        className: "one_third first"
      }, _react.default.createElement("article", {
        className: "infobox"
      }, _react.default.createElement("i", {
        className: "fa fa-codepen"
      }), _react.default.createElement("p", null, _react.default.createElement("a", null, intl.formatMessage({
        id: 'section.social.network'
      }))), _react.default.createElement("h6", {
        dangerouslySetInnerHTML: {
          __html: intl.formatMessage({
            id: 'section.social.network.desc'
          })
        }
      }))), _react.default.createElement("li", {
        className: "one_third"
      }, _react.default.createElement("article", {
        className: "infobox"
      }, _react.default.createElement("i", {
        className: "fa fa-scissors"
      }), _react.default.createElement("p", null, _react.default.createElement("a", null, intl.formatMessage({
        id: 'section.paid.off'
      }))), _react.default.createElement("h6", {
        dangerouslySetInnerHTML: {
          __html: intl.formatMessage({
            id: 'section.paid.off.desc'
          })
        }
      }))), _react.default.createElement("li", {
        className: "one_third"
      }, _react.default.createElement("article", {
        className: "infobox"
      }, _react.default.createElement("i", {
        className: "fa fa-crosshairs"
      }), _react.default.createElement("p", null, _react.default.createElement("a", null, intl.formatMessage({
        id: 'section.invite.friend'
      }))), _react.default.createElement("h6", {
        dangerouslySetInnerHTML: {
          __html: intl.formatMessage({
            id: 'section.invite.friend.desc'
          })
        }
      })))), _react.default.createElement("div", {
        className: "clear"
      }))), _react.default.createElement("div", {
        className: "wrapper row4 bgded overlay",
        style: {
          backgroundImage: "url(\"".concat(imageDir, "backgrounds/04.jpg\")")
        }
      }, _react.default.createElement("footer", {
        id: "footer",
        className: "hoc clear"
      }, _react.default.createElement("div", {
        className: "one_third first"
      }, _react.default.createElement("h6", {
        className: "heading"
      }, intl.formatMessage({
        id: 'about.us'
      })), _react.default.createElement("p", null, intl.formatMessage({
        id: 'about.desc'
      }))), _react.default.createElement("div", {
        className: "one_third"
      }, _react.default.createElement("h6", {
        className: "heading"
      }, intl.formatMessage({
        id: 'contact.info'
      })), _react.default.createElement("ul", {
        className: "nospace btmspace-30 linklist contact"
      }, _react.default.createElement("li", null, _react.default.createElement("i", {
        className: "fa fa-facebook-square"
      }), _react.default.createElement("address", null, "Coin Challenges")), _react.default.createElement("li", null, _react.default.createElement("i", {
        className: "fa fa-envelope-o"
      }), ' ', "coin.challenge.hi@gmail.com")), _react.default.createElement("ul", {
        className: "faico clear"
      }, _react.default.createElement("li", null, _react.default.createElement("a", {
        className: "faicon-facebook",
        href: "#"
      }, _react.default.createElement("i", {
        className: "fa fa-facebook"
      }))), _react.default.createElement("li", null, _react.default.createElement("a", {
        className: "faicon-twitter",
        href: "#"
      }, _react.default.createElement("i", {
        className: "fa fa-twitter"
      }))))), _react.default.createElement("div", {
        className: "one_third"
      }, _react.default.createElement("h6", {
        className: "heading"
      }, "Non lacus vivamus quis"), _react.default.createElement("article", null, _react.default.createElement("a", {
        href: "#"
      }, _react.default.createElement("img", {
        className: "btmspace-15",
        src: "".concat(imageDir, "/320x140.png"),
        alt: ""
      })), _react.default.createElement("h6", {
        className: "nospace font-x1"
      }, _react.default.createElement("a", {
        href: "#"
      }, "Sed congue vel gravida")), _react.default.createElement("time", {
        className: "font-xs block btmspace-10",
        dateTime: "2045-04-05"
      }, "Thursday, 5", _react.default.createElement("sup", null, "th"), " April 2045"), _react.default.createElement("p", {
        className: "nospace"
      }, "Viverra interdum quam in hac habitasse platea dictumst sed pede volutpat [\u2026]"))))), _react.default.createElement("div", {
        className: "wrapper row5"
      }, _react.default.createElement("div", {
        id: "copyright",
        className: "hoc clear"
      }, _react.default.createElement("p", {
        className: "fl_left"
      }, "Copyright \xA9 2019 - All Rights Reserved -", ' ', _react.default.createElement("a", {
        href: "#"
      }, "coin.walk.com")), _react.default.createElement("p", {
        className: "fl_right"
      }, "Template by", ' ', _react.default.createElement("a", {
        target: "_blank",
        href: "http://www.os-templates.com/",
        title: "Free Website Templates"
      }, "OS Templates")))), _react.default.createElement("a", {
        id: "backtotop",
        href: "#top"
      }, _react.default.createElement("i", {
        className: "fa fa-chevron-up"
      })), _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("script", {
        src: "/landing/jquery.mobilemenu.js",
        defer: true,
        ref: this.scriptRef2
      }))) : _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("script", {
        src: "/landing/jquery.min.js",
        defer: true,
        ref: this.scriptRef
      })));
    }
  }]);

  return Landing;
}(_react.default.PureComponent);

var _default = (0, _reactIntl.injectIntl)(Landing);

exports.default = _default;