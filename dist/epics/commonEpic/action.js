"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withdrawBalance = exports.setBalance = exports.getBalance = exports.setConfirm = exports.checkWallet = exports.setPopup = exports.setContract = exports.initContract = exports.SET_WITHRAW_RESULT = exports.WITHDRAW_BALANCE = exports.SET_BALANCE = exports.GET_BALANCE = exports.SET_CONFIRM = exports.CHECK_WALLET = exports.SET_POPUP = exports.SET_CONTRACT = exports.INIT_CONTRACT = void 0;
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
var GET_BALANCE = '@COMMON/GET_BALANCE';
exports.GET_BALANCE = GET_BALANCE;
var SET_BALANCE = '@COMMON/SET_BALANCE';
exports.SET_BALANCE = SET_BALANCE;
var WITHDRAW_BALANCE = '@COMMON/WITHDRAW_BALANCE';
exports.WITHDRAW_BALANCE = WITHDRAW_BALANCE;
var SET_WITHRAW_RESULT = '@COMMON/SET_WITHRAW_RESULT';
exports.SET_WITHRAW_RESULT = SET_WITHRAW_RESULT;

var initContract = function initContract(chain) {
  return {
    type: INIT_CONTRACT,
    payload: {
      chain: chain
    }
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

var checkWallet = function checkWallet(chain) {
  return {
    type: CHECK_WALLET,
    payload: chain
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

var getBalance = function getBalance() {
  return {
    type: GET_BALANCE
  };
};

exports.getBalance = getBalance;

var setBalance = function setBalance(balance) {
  return {
    type: SET_BALANCE,
    payload: {
      balance: balance
    }
  };
};

exports.setBalance = setBalance;

var withdrawBalance = function withdrawBalance() {
  return {
    type: WITHDRAW_BALANCE
  };
};

exports.withdrawBalance = withdrawBalance;