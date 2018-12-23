"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.newChallengeGroupEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var newChallengeGroupEpic = function newChallengeGroupEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.CREATE_CHALLENGE_GROUP), (0, _operators.switchMap)(function (action) {
    var _contract$methods;

    var commonReducer = state$.value.get('common');
    var payload = action.payload;
    var _ref = [commonReducer.get('contract'), commonReducer.get('userAddress')],
        contract = _ref[0],
        address = _ref[1];
    return (0, _rxjs.from)((_contract$methods = contract.methods).createChallengeGroup.apply(_contract$methods, _toConsumableArray(Object.values(payload)).concat([state$.value.get('common').get('accounts')[1]])).send({
      from: address
    })).pipe((0, _operators.map)(function (response) {
      // const challengeObject = {
      //   groupId: payload.id,
      //   targetDays: payload.minDays + 1,
      //   totalDays: payload.maxDays,
      //   startTime: Math.floor(Date.now() / 1000)
      // }
      // contract.methods
      //   .createChallenge(...Object.values(challengeObject))
      //   .send({
      //     from: address,
      //     value: 100000000
      //   })
      //   .on('error', function(error: any) {
      //     console.log(99999)
      //     console.log(error)
      //   })
      //   .then((res: any) => {
      //     console.log(222222)
      //     console.log(res)
      //   })
      return (0, _action.setCreateResult)({
        response: {
          status: response.status,
          gasUsed: response.gasUsed
        },
        error: false
      });
    }));
  }), (0, _operators.catchError)(function (err) {
    // invalid address
    // connection not open
    console.log(11111);
    console.log(err);
    return (0, _rxjs.of)((0, _action.setCreateResult)({
      response: {},
      error: true
    }));
  }));
};

exports.newChallengeGroupEpic = newChallengeGroupEpic;
var _default = [newChallengeGroupEpic];
/** Create receipt
   * 
   * blockHash: "0x16c55efa6a132400c87f31d33ad5f79ada8d788be9bb7adf190d2f7e6a3c5dff"
blockNumber: 5
contractAddress: null
cumulativeGasUsed: 126914
events:
NewChallengeGroup:
address: "0x21e4624c5A0B3fdA81D0833d412DDED2bb3A7a7C"
blockHash: "0x16c55efa6a132400c87f31d33ad5f79ada8d788be9bb7adf190d2f7e6a3c5dff"
blockNumber: 5
event: "NewChallengeGroup"
id: "log_cef17bc2"
logIndex: 0
raw: {data: "0x000000000000000000000000000000000000000000000000…0000000000000000000000000000000000000000000000000", topics: Array(2)}
returnValues: Result {0: "0x1d489c3F8Ed5Ee71325A847888B2157c9ac29c05", 1: "", proposer: "0x1d489c3F8Ed5Ee71325A847888B2157c9ac29c05", id: ""}
signature: "0x71d49af7e2735dd98a820c3e35a19b83758b3b63a172a20d4bbf357956e52ca4"
transactionHash: "0x42a93f6041c751b6120fad49f2acbb6ad7f8164a35b2093d2fc8fdda7ef4fd34"
transactionIndex: 0
type: "mined"
__proto__: Object
__proto__: Object
from: "0x1d489c3f8ed5ee71325a847888b2157c9ac29c05"
gasUsed: 126914
logsBloom: "0x00000000000000010000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000400000400000000000000000002400000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000"
r: "0xff810bdb1944951a73f14f4dd1790fdc0e5c10151a448716b953cbd0347d7986"
s: "0x1b4e98617429a0b59d321ba55ffd81e444511e6112c1396be28ea47e746e7db5"
status: true
to: "0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c"
transactionHash: "0x42a93f6041c751b6120fad49f2acbb6ad7f8164a35b2093d2fc8fdda7ef4fd34"
transactionIndex: 0
v: "0x1c"
   */

exports.default = _default;
//# sourceMappingURL=challengeGroupEpic.js.map