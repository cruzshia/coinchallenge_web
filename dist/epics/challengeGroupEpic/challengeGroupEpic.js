"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.newChallengeGroupEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var _action2 = require("../commonEpic/action");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseErrorMsg(err) {
  if (err.indexOf('invalid addres') > -1) {
    return 'invalidAddress';
  } else if (err.indexOf('connection not open') > -1) {
    return 'connectNotOpen';
  } else if (err.indexOf('User denied') > -1) {
    return 'userDenied';
  }

  return 'createGroupError';
}

var newChallengeGroupEpic = function newChallengeGroupEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.CREATE_CHALLENGE_GROUP), (0, _operators.take)(1), (0, _operators.filter)(function () {
    return state$.value.get('common').get('txContract') !== null;
  }), (0, _operators.switchMap)(function (action) {
    var _contract$methods;

    var commonReducer = state$.value.get('common');

    var payload = _objectSpread({}, action.payload);

    var _ref = [commonReducer.get('txContract'), commonReducer.get('userAddress')],
        contract = _ref[0],
        address = _ref[1];
    var dispatch = payload.dispatch;
    delete payload.dispatch;
    payload.minAmount = web3.utils.toWei(payload.minAmount, 'ether');
    return (0, _rxjs.from)((_contract$methods = contract.methods).createChallengeGroup.apply(_contract$methods, _toConsumableArray(Object.values(payload)).concat([address])).send({
      from: address
    }, function (_err, hash) {
      dispatch((0, _action2.setConfirm)({
        isConfirming: true,
        txHash: hash
      }));
    })).pipe((0, _operators.mergeMap)(function (response) {
      var _contract$methods2;

      window.contract = contract;
      var challengeObject = {
        groupId: payload.id,
        targetDays: payload.minDays,
        totalDays: payload.maxDays,
        startTime: Math.floor(Date.now() / 1000)
      };

      (_contract$methods2 = contract.methods).createChallenge.apply(_contract$methods2, _toConsumableArray(Object.values(challengeObject))).send({
        from: address,
        value: web3.utils.toWei('0.01', 'ether')
      }).on('error', function (error) {
        console.log(error);
      }).then(function (res) {
        console.log('create challenge success!');
      });

      return (0, _rxjs.of)((0, _action.setCreateResult)({
        response: {
          status: response.status,
          gasUsed: response.gasUsed
        },
        error: false
      }), (0, _action2.setPopup)({
        showPop: true,
        messageKey: 'createSuccess'
      }));
    }), (0, _operators.catchError)(function (err) {
      return (0, _rxjs.of)((0, _action2.setPopup)({
        showPop: true,
        messageKey: parseErrorMsg(err.message)
      }), (0, _action.setCreateResult)({
        response: {},
        error: true
      }));
    }));
  }), (0, _operators.repeat)());
};

exports.newChallengeGroupEpic = newChallengeGroupEpic;
var _default = [newChallengeGroupEpic];
exports.default = _default;