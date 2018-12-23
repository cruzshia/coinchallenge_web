"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewChallengeGroup = exports.getFinishChallenges = exports.getAllChallenges = exports.getChallenge = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//process.env.REACT_APP_CONTRACT_ADDRESS
var STATUS = {
  Succeeded: 0,
  Failed: 1,
  Aborted: 2
};

var getChallenge =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var contract, groupId, challenger, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contract = _ref.contract, groupId = _ref.groupId, challenger = _ref.challenger;
            _context.prev = 1;
            _context.next = 4;
            return contract.methods.getChallenge(groupId, challenger).call();

          case 4:
            response = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            response = {
              message: _context.t0,
              error: true
            };

          case 10:
            return _context.abrupt("return", response);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function getChallenge(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getChallenge = getChallenge;

var getAllChallenges =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var contract, challenger;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contract = _ref3.contract, challenger = _ref3.challenger;
            _context2.next = 3;
            return contract.events.NewChallenge({
              filter: {
                proposer: challenger
              },
              fromBlock: 0 // toBlock: 'latest'

            }, function (_error, event) {
              console.log('event,', event);
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getAllChallenges(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllChallenges = getAllChallenges;

var getFinishChallenges =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var contract, challenger;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contract = _ref5.contract, challenger = _ref5.challenger;
            _context3.next = 3;
            return contract.events.FinishChallenge({
              filter: {
                who: challenger,
                status: STATUS.Succeeded
              },
              fromBlock: 0 // to: 'latest'

            }, function (_error, event) {
              console.log('event,', event);
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getFinishChallenges(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getFinishChallenges = getFinishChallenges;

var getNewChallengeGroup =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(contract) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return contract.events.NewChallengeGroup({
              fromBlock: 0
            }, function (_error, event) {
              console.log('event,', event);
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getNewChallengeGroup(_x4) {
    return _ref7.apply(this, arguments);
  };
}(); // contract.getPastEvents('allEvents', {fromBlock: 0}, function(error, events){ console.log(events); })
// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })
// await MyContract.events.NewChallengeGroup(
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )
// await MyContract.events.NewChallenge(
//   {proposer: challenger},
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )
// await MyContract.events.FinishChallenge(
//   {who: challenger, status: 0},
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )


exports.getNewChallengeGroup = getNewChallengeGroup;
//# sourceMappingURL=contractService.js.map