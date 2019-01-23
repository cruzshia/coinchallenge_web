"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sponsorChallenge = exports.getChallenge = exports.sponsorEvents = exports.getPastSponsor = exports.getAllPastEvents = exports.getNewChallengeGroup = exports.getPastChallenges = exports.newChallengesEvents = exports.getChallengeGroup = void 0;

var _contractUtils = require("../utils/contractUtils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getChallengeGroup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(props) {
    var contract, groupId, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contract = props.contract, groupId = props.groupId;
            _context.next = 3;
            return contract.methods.getChallengeGroup(groupId).call();

          case 3:
            res = _context.sent;
            return _context.abrupt("return", {
              name: res._name,
              url: res._url
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getChallengeGroup(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getChallengeGroup = getChallengeGroup;

var newChallengesEvents =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var contract, filter, callback;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contract = _ref2.contract, filter = _ref2.filter, callback = _ref2.callback;
            _context2.next = 3;
            return contract.events.NewChallenge({
              filter: filter,
              fromBlock: 0
            }, function (_error, event) {
              var _event$returnValues = event.returnValues,
                  proposer = _event$returnValues.proposer,
                  groupId = _event$returnValues.groupId,
                  targetDays = _event$returnValues.targetDays,
                  totalDays = _event$returnValues.totalDays,
                  startDayTimestamp = _event$returnValues.startDayTimestamp,
                  amount = _event$returnValues.amount;
              callback && callback({
                proposer: proposer,
                groupId: groupId,
                targetDays: targetDays,
                totalDays: totalDays,
                startDayTimestamp: startDayTimestamp,
                amount: amount
              });
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function newChallengesEvents(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.newChallengesEvents = newChallengesEvents;

var getPastChallenges =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref4) {
    var contract, challenger, statusData, finishChallenges, i, status;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contract = _ref4.contract, challenger = _ref4.challenger;
            statusData = new Array(3).fill(0);
            _context3.next = 4;
            return getAllPastEvents(contract, 'FinishChallenge', {
              fromBlock: 0,
              filter: {
                who: challenger
              }
            });

          case 4:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 7;
              break;
            }

            _context3.t0 = [];

          case 7:
            finishChallenges = _context3.t0;

            for (i = 0; i < finishChallenges.length; i++) {
              status = finishChallenges[i].returnValues.status;
              statusData[status]++;
            }

            return _context3.abrupt("return", statusData);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getPastChallenges(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getPastChallenges = getPastChallenges;

var getNewChallengeGroup =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
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
    return _ref6.apply(this, arguments);
  };
}();

exports.getNewChallengeGroup = getNewChallengeGroup;

var getAllPastEvents =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(contract) {
    var event,
        options,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            event = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 'allEvents';
            options = _args5.length > 2 ? _args5[2] : undefined;
            options = options || {
              fromBlock: 0
            };

            if (contract) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return");

          case 5:
            _context5.next = 7;
            return contract.getPastEvents(event, options);

          case 7:
            return _context5.abrupt("return", _context5.sent);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getAllPastEvents(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAllPastEvents = getAllPastEvents;

var getPastSponsor =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(contract, sponserSize, options) {
    var response, data, sponsers;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = options || {
              fromBlock: 0
            };
            response = {
              blockNumber: 0,
              data: []
            };
            data = [];
            _context6.next = 5;
            return getAllPastEvents(contract, 'SponsorChallenge', options);

          case 5:
            _context6.t0 = _context6.sent;

            if (_context6.t0) {
              _context6.next = 8;
              break;
            }

            _context6.t0 = [];

          case 8:
            sponsers = _context6.t0;

            if (sponsers.length) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", response);

          case 11:
            sponserSize = sponserSize || sponsers.length;
            data = sponsers.slice(sponserSize * -1).reverse();
            response.blockNumber = data[0].blockNumber;
            response.data = data.map(function (sponsor) {
              var _sponsor$returnValues = sponsor.returnValues,
                  amount = _sponsor$returnValues.amount,
                  comment = _sponsor$returnValues.comment,
                  who = _sponsor$returnValues.who;
              return {
                amount: amount,
                comment: comment,
                who: who
              };
            }) || [];
            return _context6.abrupt("return", response);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getPastSponsor(_x6, _x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getPastSponsor = getPastSponsor;

var sponsorEvents =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_ref9) {
    var contract, challenger, _ref9$fromBlock, fromBlock, callback;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            contract = _ref9.contract, challenger = _ref9.challenger, _ref9$fromBlock = _ref9.fromBlock, fromBlock = _ref9$fromBlock === void 0 ? 0 : _ref9$fromBlock, callback = _ref9.callback;
            contract.events.SponsorChallenge({
              filter: {
                challenger: challenger
              },
              fromBlock: fromBlock ? fromBlock + 1 : fromBlock
            }).on('data', function (event) {
              console.log('sponsor', event);

              if (callback) {
                var _event$returnValues2 = event.returnValues,
                    _amount = _event$returnValues2.amount,
                    _comment = _event$returnValues2.comment,
                    who = _event$returnValues2.who;
                callback({
                  amount: _amount,
                  comment: _comment,
                  who: who
                });
              }
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function sponsorEvents(_x9) {
    return _ref10.apply(this, arguments);
  };
}();

exports.sponsorEvents = sponsorEvents;

var getChallenge =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_ref11) {
    var contract, groupId, challenger, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            contract = _ref11.contract, groupId = _ref11.groupId, challenger = _ref11.challenger;
            _context8.next = 3;
            return contract.methods.getChallenge(groupId, challenger).call();

          case 3:
            response = _context8.sent;
            return _context8.abrupt("return", (0, _contractUtils.parseChallenge)(response));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getChallenge(_x10) {
    return _ref12.apply(this, arguments);
  };
}(); // interface GetSponsorProp {
//   contract: Contract
//   groupId: string
//   address: string
//   sponsorSize: number
// }
// export const getChellengeSponsors = async ({
//   contract,
//   groupId,
//   address,
//   sponsorSize
// }: GetSponsorProp) => {
//   let sponsors: Sponsor[] = []
//   for (let i = 0; i < sponsorSize; i++) {
//     const sponsor = await contract.methods
//       .getSponsor(groupId, address, i)
//       .call()
//     sponsors.push({
//       who: sponsor._who,
//       amount: sponsor._amount,
//       comment: sponsor._comment
//     })
//   }
//   return sponsors
// }


exports.getChallenge = getChallenge;

var sponsorChallenge =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_ref13) {
    var contract, groupId, address, from, amount, comment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            contract = _ref13.contract, groupId = _ref13.groupId, address = _ref13.address, from = _ref13.from, amount = _ref13.amount, comment = _ref13.comment;
            _context9.next = 3;
            return contract.methods.sponsorChallenge(groupId, address, comment).send({
              from: from,
              value: amount
            }).on('error', function (err) {
              console.log('sponer error');
              console.log(err);
            }).then(function (res) {
              console.log('sponser success');
              console.log(res);
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function sponsorChallenge(_x11) {
    return _ref14.apply(this, arguments);
  };
}(); // contract.getPastEvents('allEvents', {fromBlock: 0}, function(error, events){ console.log(events); })
// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })


exports.sponsorChallenge = sponsorChallenge;