"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostUrl = exports.supportLang = exports.breakPoint = void 0;
var breakPoint = '800px';
exports.breakPoint = breakPoint;
var supportLang = ['en_US', 'zh_TW', 'zh_CN'];
exports.supportLang = supportLang;

var hostUrl = function hostUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://coinchallenges.app/';
  }

  return 'https://coin-challenges.herokuapp.com/';
};

exports.hostUrl = hostUrl;