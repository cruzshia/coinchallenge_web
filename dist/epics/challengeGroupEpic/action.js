"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCreateResult = exports.newChallengeGroup = exports.SET_CREATE_RESULT = exports.CREATE_CHALLENGE_GROUP = void 0;
var CREATE_CHALLENGE_GROUP = 'CREATE_CHALLENGE_GROUP';
exports.CREATE_CHALLENGE_GROUP = CREATE_CHALLENGE_GROUP;
var SET_CREATE_RESULT = 'SET_CREATE_RESULT';
exports.SET_CREATE_RESULT = SET_CREATE_RESULT;

var newChallengeGroup = function newChallengeGroup(payload) {
  return {
    type: CREATE_CHALLENGE_GROUP,
    payload: payload
  };
};

exports.newChallengeGroup = newChallengeGroup;

var setCreateResult = function setCreateResult(payload) {
  return {
    type: SET_CREATE_RESULT,
    payload: payload
  };
};

exports.setCreateResult = setCreateResult;