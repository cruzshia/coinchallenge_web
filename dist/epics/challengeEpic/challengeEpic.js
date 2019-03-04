"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sponsorChallengeEpic = exports.getChallengeEpic = exports.getChallengeGroupEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var _action2 = require("../commonEpic/action");

var _contractUtils = require("../../utils/contractUtils");

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChallengeGroupEpic = function getChallengeGroupEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.GET_CAHLLENGE), (0, _operators.switchMap)(function (action) {
    var commonReducer = state$.value.get('common');
    var _ref = [commonReducer.get('contract')],
        contract = _ref[0];
    var _ref2 = action.payload,
        groupId = _ref2.groupId;
    return (0, _rxjs.from)(contract.methods.getChallengeGroup(groupId).call()).pipe((0, _operators.map)(function (response) {
      return (0, _action.setChallengeGroup)({
        groupName: response._name,
        groupImage: response._url,
        minAmount: Number(_web.default.utils.fromWei(response._minAmount))
      });
    }), (0, _operators.catchError)(function (err) {
      return (0, _rxjs.of)((0, _action2.setPopup)({
        showPop: true,
        messageKey: 'challengeGroup.error'
      }));
    }));
  }));
};

exports.getChallengeGroupEpic = getChallengeGroupEpic;

var getChallengeEpic = function getChallengeEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.GET_CAHLLENGE), (0, _operators.switchMap)(function (action) {
    var _contract$methods;

    var commonReducer = state$.value.get('common');
    var _ref3 = [commonReducer.get('contract')],
        contract = _ref3[0];
    var _ref4 = action.payload,
        groupId = _ref4.groupId,
        challenger = _ref4.challenger,
        round = _ref4.round;
    var method = isNaN(round) ? 'getCurrentChallenge' : 'getChallenge';
    var params = isNaN(round) ? [groupId, challenger] : [groupId, challenger, round];
    return (0, _rxjs.from)((_contract$methods = contract.methods)[method].apply(_contract$methods, params).call()).pipe((0, _operators.map)(function (response) {
      var challenge = (0, _contractUtils.parseChallenge)(response);
      return challenge.totalDays ? (0, _action.setChallenge)(challenge) : (0, _action2.setPopup)({
        showPop: true,
        messageKey: 'challenge.error'
      });
    }), (0, _operators.catchError)(function (_err) {
      return (0, _rxjs.of)((0, _action2.setPopup)({
        showPop: true,
        messageKey: 'challenge.error'
      }));
    }));
  }));
};

exports.getChallengeEpic = getChallengeEpic;

var sponsorChallengeEpic = function sponsorChallengeEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.SPONSER_CHALLENGE), (0, _operators.filter)(function () {
    return state$.value.get('common').get('txContract') !== null;
  }), (0, _operators.take)(1), (0, _operators.switchMap)(function (action) {
    var commonReducer = state$.value.get('common');
    var payload = action.payload;
    var groupId = payload.groupId,
        who = payload.who,
        comment = payload.comment,
        amount = payload.amount,
        dispatch = payload.dispatch;
    var _ref5 = [commonReducer.get('txContract'), commonReducer.get('userAddress')],
        contract = _ref5[0],
        address = _ref5[1];
    return (0, _rxjs.from)(contract.methods.sponsorChallenge(groupId, who, comment).send({
      from: address,
      value: _web.default.utils.toWei(String(amount), 'ether')
    }, function (_err, hash) {
      dispatch && dispatch((0, _action.setConfirmSponsor)({
        isCofirmingSponsor: true,
        txhash: hash
      }));
    })).pipe((0, _operators.mergeMap)(function () {
      return (0, _rxjs.of)( // setPopup({ showPop: true, messageKey: 'donateSuccess' }),
      (0, _action.setConfirmSponsor)({
        isCofirmingSponsor: false,
        txhash: ''
      }));
    }), (0, _operators.catchError)(function (err) {
      return (0, _rxjs.of)( // setPopup({ showPop: true, popMessage: err.message }),
      (0, _action.setConfirmSponsor)({
        isCofirmingSponsor: false,
        txhash: ''
      }));
    }));
  }), (0, _operators.repeat)());
};

exports.sponsorChallengeEpic = sponsorChallengeEpic;
var _default = [getChallengeGroupEpic, getChallengeEpic, sponsorChallengeEpic];
exports.default = _default;