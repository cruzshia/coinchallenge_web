"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfirm = exports.checkWallet = exports.setPopup = exports.setContract = exports.initContract = exports.SET_CONFIRM = exports.CHECK_WALLET = exports.SET_POPUP = exports.SET_CONTRACT = exports.INIT_CONTRACT = void 0;
var INIT_CONTRACT = '@COMMON/INIT_CONTRACT';
exports.INIT_CONTRACT = INIT_CONTRACT;
var SET_CONTRACT = '@COMMON/SET_CONTRACT';
exports.SET_CONTRACT = SET_CONTRACT;
var SET_POPUP = '@COMMON/SET_POPUP';
exports.SET_POPUP = SET_POPUP;
var CHECK_WALLET = '@COMMON/CHECK_WALLET';
exports.CHECK_WALLET = CHECK_WALLET;
var SET_CONFIRM = '@COMMON/SET_CONFIRM';
exports.SET_CONFIRM = SET_CONFIRM;

var initContract = function initContract() {
  return {
    type: INIT_CONTRACT
  };
};

exports.initContract = initContract;

var setContract = function setContract(payload) {
  return {
    type: SET_CONTRACT,
    payload: payload
  };
};

exports.setContract = setContract;

var setPopup = function setPopup(payload) {
  return {
    type: SET_POPUP,
    payload: {
      popMessage: payload.popMessage || '',
      messageKey: payload.messageKey || null,
      showPop: payload.showPop
    }
  };
};

exports.setPopup = setPopup;

var checkWallet = function checkWallet() {
  return {
    type: CHECK_WALLET
  };
};

exports.checkWallet = checkWallet;

var setConfirm = function setConfirm(payload) {
  return {
    type: SET_CONFIRM,
    payload: payload
  };
};

exports.setConfirm = setConfirm;