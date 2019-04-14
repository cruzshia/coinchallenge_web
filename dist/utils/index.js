"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDexon = exports.changeRoute = exports.parseLangPath = exports.parseLangParams = exports.matchPathFunc = exports.formatNumber = exports.isUrlValid = exports.formatPercent = exports.getMetmaskUrl = void 0;

var _detectBrowser = require("detect-browser");

var _decimal = require("decimal.js");

var _reactRouterDom = require("react-router-dom");

var _common = require("../contants/common");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browser = (0, _detectBrowser.detect)();

var getMetmaskUrl = function getMetmaskUrl() {
  switch (browser && browser.name) {
    case 'chrome':
      return 'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn';

    case 'firefox':
      return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';

    case 'opera':
      return 'https://addons.opera.com/en/extensions/details/metamask/';

    default:
      return null;
  }
};

exports.getMetmaskUrl = getMetmaskUrl;

var formatPercent = function formatPercent(a, b) {
  if (b === 0 || a === 0) {
    return '0%';
  }

  return Number(new _decimal.Decimal(a * 100 / b).toFixed(2).toString()) + '%';
};

exports.formatPercent = formatPercent;

var isUrlValid = function isUrlValid(url) {
  return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
};

exports.isUrlValid = isUrlValid;

var formatNumber = function formatNumber(val) {
  val = val || 0;
  return new _decimal.Decimal(val).toPrecision(5);
};

exports.formatNumber = formatNumber;

var matchPathFunc = function matchPathFunc(pathname) {
  return (0, _reactRouterDom.matchPath)(pathname, {
    path: '/:lng/**/',
    strict: false
  });
};

exports.matchPathFunc = matchPathFunc;

var parseLangParams = function parseLangParams(search) {
  var urlParams = new URLSearchParams(search);
  return urlParams.get('l') || '';
};

exports.parseLangParams = parseLangParams;

var parseLangPath = function parseLangPath(search) {
  var lng = parseLangParams(search);

  if (lng === '') {
    lng = _jsCookie.default.get('_coin_lng_') || '';
  }

  if (!lng || lng === '') {
    if (typeof window !== 'undefined') {
      lng = require('browser-locale')();
    }

    lng = lng.indexOf('en') > -1 ? 'en' : lng;
    var splitLng = lng ? lng.split(/-|_/) : ['en'];
    lng = splitLng.length > 1 ? "".concat(splitLng[0], "-").concat(splitLng[1].toUpperCase()) : splitLng[0];
  }

  if (_common.supportLang.indexOf(lng) < 0) {
    lng = 'en';
  }

  _jsCookie.default.set('_coin_lng_', lng);

  return lng;
};

exports.parseLangPath = parseLangPath;

var changeRoute = function changeRoute(_ref) {
  var location = _ref.location,
      history = _ref.history;
  var lng = parseLangParams(location.search);

  if (lng === '' || lng !== 'en') {
    history.replace(location.pathname + "?l=".concat(parseLangPath(location.search)));
  }
};

exports.changeRoute = changeRoute;

var isDexon = function isDexon(chain) {
  return chain === 'dexon';
};

exports.isDexon = isDexon;