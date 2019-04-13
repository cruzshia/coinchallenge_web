"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APP_COIN = exports.hostUrl = exports.supportLang = exports.breakPoint = void 0;
var breakPoint = '800px';
exports.breakPoint = breakPoint;
var supportLang = ['en', 'zh-TW', 'zh-CN'];
exports.supportLang = supportLang;

var hostUrl = function hostUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://coinchallenges.app/';
  }

  return 'https://coin-challenges.herokuapp.com/';
};

exports.hostUrl = hostUrl;

var APP_COIN = function APP_COIN(chain) {
  return chain && chain === 'dexon' ? 'DXN' : 'ETH';
};

exports.APP_COIN = APP_COIN;