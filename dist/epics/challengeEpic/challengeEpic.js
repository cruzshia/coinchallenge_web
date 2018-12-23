"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sponserChallengeEpic = exports.getChallengeEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

// import { Sponser } from '@Reducers/challengeReducer'
var getChallengeEpic = function getChallengeEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.GET_CAHLLENGE), (0, _operators.switchMap)(function (action) {
    var commonReducer = state$.value.get('common');
    var _ref = [commonReducer.get('contract')],
        contract = _ref[0];
    var _ref2 = action.payload,
        groupId = _ref2.groupId,
        challenger = _ref2.challenger;
    return (0, _rxjs.from)(contract.methods.getChallenge(groupId, challenger).call()).pipe((0, _operators.map)(function (response) {
      var challenge = {
        targetDays: Number(response[0]),
        totalDays: Number(response[1]),
        completeDays: Number(response[2]),
        startDayTimestamp: Number(response[3]) * 1000,
        sponserSize: Number(response[5])
      };
      return (0, _action.setChallenge)(challenge);
    }));
  }) // catchError((err: any) => {
  //   return of({ type: 'test' })
  // })
  );
};

exports.getChallengeEpic = getChallengeEpic;

var sponserChallengeEpic = function sponserChallengeEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.SPONSER_CHALLENGE), (0, _operators.map)(function () {
    return (0, _action.setSponserResult)({});
  }));
}; // export const getChallengeSponserEpic = async (
// action$: ActionsObservable<Action>,
// state$: StateObservable<any>
// ) =>
//   action$.pipe(
//     ofType(GET_CAHLLENGE_SPONSERS),
//     map(async (action: Action) => {
//       const contract = state$.value.get('common').get('contract')
//       const sponserSize = state$.value.get('challenge').get('sponserSize') || 0
//       const { groupId, challenger } = action.payload as any
//       let sponsers: Array<Sponser> = []
//       for (let i = 0; i < sponserSize; i++) {
//         const sponser = await contract.methods
//           .getSponsor(groupId, challenger, i)
//           .call()
//         sponsers.push(sponser)
//       }
//       return setChallengeSponsers({ sponsers })
//     })
//   )


exports.sponserChallengeEpic = sponserChallengeEpic;
var _default = [getChallengeEpic];
exports.default = _default;
//# sourceMappingURL=challengeEpic.js.map