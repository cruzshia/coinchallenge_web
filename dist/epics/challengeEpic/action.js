"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setChallengeSponsers = exports.getChallengeSponsers = exports.setChallenge = exports.getChallenge = exports.setSponserResult = exports.sponserChallenge = exports.SET_SPONSER_RESULT = exports.SPONSER_CHALLENGE = exports.SET_CAHLLENGE_SPONSERS = exports.GET_CAHLLENGE_SPONSERS = exports.SET_CAHLLENGE = exports.GET_CAHLLENGE = void 0;
//sponsorChallenge
var GET_CAHLLENGE = 'GET_CAHLLENGE';
exports.GET_CAHLLENGE = GET_CAHLLENGE;
var SET_CAHLLENGE = 'SET_CAHLLENGE';
exports.SET_CAHLLENGE = SET_CAHLLENGE;
var GET_CAHLLENGE_SPONSERS = 'GET_CAHLLENGE_SPONSERS';
exports.GET_CAHLLENGE_SPONSERS = GET_CAHLLENGE_SPONSERS;
var SET_CAHLLENGE_SPONSERS = 'SET_CAHLLENGE_SPONSERS';
exports.SET_CAHLLENGE_SPONSERS = SET_CAHLLENGE_SPONSERS;
var SPONSER_CHALLENGE = 'SPONSER_CHALLENGE';
exports.SPONSER_CHALLENGE = SPONSER_CHALLENGE;
var SET_SPONSER_RESULT = 'SET_SPONSER_RESULT';
exports.SET_SPONSER_RESULT = SET_SPONSER_RESULT;

var sponserChallenge = function sponserChallenge(payload) {
  return {
    type: SPONSER_CHALLENGE,
    payload: payload
  };
};

exports.sponserChallenge = sponserChallenge;

var setSponserResult = function setSponserResult(payload) {
  return {
    type: SET_SPONSER_RESULT,
    payload: payload
  };
};

exports.setSponserResult = setSponserResult;

var getChallenge = function getChallenge(payload) {
  return {
    type: GET_CAHLLENGE,
    payload: payload
  };
};

exports.getChallenge = getChallenge;

var setChallenge = function setChallenge(payload) {
  return {
    type: SET_CAHLLENGE,
    payload: payload
  };
};

exports.setChallenge = setChallenge;

var getChallengeSponsers = function getChallengeSponsers(payload) {
  return {
    type: GET_CAHLLENGE_SPONSERS,
    payload: payload
  };
};

exports.getChallengeSponsers = getChallengeSponsers;

var setChallengeSponsers = function setChallengeSponsers(payload) {
  return {
    type: GET_CAHLLENGE_SPONSERS,
    payload: payload
  };
};

exports.setChallengeSponsers = setChallengeSponsers;
//# sourceMappingURL=action.js.map