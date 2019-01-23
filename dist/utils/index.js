"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLangPath = exports.matchPathFunc = exports.formatNumber = exports.isUrlValid = exports.formatPercent = exports.getMetmaskUrl = void 0;

var _detectBrowser = require("detect-browser");

var _decimal = require("decimal.js");

var _reactRouterDom = require("react-router-dom");

var _common = require("../contants/common");

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
  if (b === 0) {
    return '0.0';
  }

  return new _decimal.Decimal(a * 100 / b).toPrecision(2);
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

var parseLangPath = function parseLangPath(pathname) {
  var match = matchPathFunc(pathname);

  var _ref = match ? match.params : {
    lng: ''
  },
      lng = _ref.lng;

  if (!lng || lng === '') {
    lng = require('browser-locale')();
    lng = lng.indexOf('en') > -1 ? 'en' : lng;
    var splitLng = lng ? lng.split(/-|_/) : ['en'];
    lng = splitLng.length > 1 ? "".concat(splitLng[0], "-").concat(splitLng[1].toUpperCase()) : splitLng[0];
  }

  if (!match || _common.supportLang.indexOf(lng) < 0) {
    return 'en';
  }

  return lng;
};

exports.parseLangPath = parseLangPath;