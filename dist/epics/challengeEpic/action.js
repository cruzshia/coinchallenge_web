"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConfirmSponsor = exports.setChallengeSponsers = exports.setChallenge = exports.getChallenge = exports.setChallengeGroup = exports.sponserChallenge = exports.SET_COFIRM_SPONSOR = exports.SPONSER_CHALLENGE = exports.SET_CAHLLENGE_SPONSERS = exports.SET_CAHLLENGE_GROUP = exports.SET_CAHLLENGE = exports.GET_CAHLLENGE = void 0;
var GET_CAHLLENGE = '@CAHLLENGE/GET_CAHLLENGE';
exports.GET_CAHLLENGE = GET_CAHLLENGE;
var SET_CAHLLENGE = '@CAHLLENGE/SET_CAHLLENGE';
exports.SET_CAHLLENGE = SET_CAHLLENGE;
var SET_CAHLLENGE_GROUP = '@CAHLLENGE/SET_CAHLLENGE_GROUP';
exports.SET_CAHLLENGE_GROUP = SET_CAHLLENGE_GROUP;
var SET_CAHLLENGE_SPONSERS = '@CAHLLENGE/SET_CAHLLENGE_SPONSERS';
exports.SET_CAHLLENGE_SPONSERS = SET_CAHLLENGE_SPONSERS;
var SPONSER_CHALLENGE = '@CAHLLENGE/SPONSER_CHALLENGE';
exports.SPONSER_CHALLENGE = SPONSER_CHALLENGE;
var SET_COFIRM_SPONSOR = '@CAHLLENGE/SET_COFIRM_SPONSOR';
exports.SET_COFIRM_SPONSOR = SET_COFIRM_SPONSOR;

var sponserChallenge = function sponserChallenge(payload) {
  return {
    type: SPONSER_CHALLENGE,
    payload: payload
  };
};

exports.sponserChallenge = sponserChallenge;

var setChallengeGroup = function setChallengeGroup(payload) {
  return {
    type: SET_CAHLLENGE_GROUP,
    payload: payload
  };
};

exports.setChallengeGroup = setChallengeGroup;

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

var setChallengeSponsers = function setChallengeSponsers(payload) {
  return {
    type: SET_CAHLLENGE_SPONSERS,
    payload: payload
  };
};

exports.setChallengeSponsers = setChallengeSponsers;

var setConfirmSponsor = function setConfirmSponsor(payload) {
  return {
    type: SET_COFIRM_SPONSOR,
    payload: payload
  };
};

exports.setConfirmSponsor = setConfirmSponsor;