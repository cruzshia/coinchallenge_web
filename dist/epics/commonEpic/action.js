"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContract = exports.initContract = exports.SET_CONTRACT = exports.INIT_CONTRACT = void 0;
var INIT_CONTRACT = 'INIT_CONTRACT';
exports.INIT_CONTRACT = INIT_CONTRACT;
var SET_CONTRACT = 'SET_CONTRACT';
exports.SET_CONTRACT = SET_CONTRACT;

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
//# sourceMappingURL=action.js.map