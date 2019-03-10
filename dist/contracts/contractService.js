"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sponsorChallenge = exports.getChallenge = exports.sponsorEvents = exports.getPastSponsor = exports.getAllPastEvents = exports.getNewChallengeGroup = exports.getPastChallenges = exports.newChallengesEvents = exports.canSponsor = exports.getChallengeGroup = void 0;

var _contractUtils = require("../utils/contractUtils");

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
              url: res._url,
              minAmount: Number(_web.default.utils.fromWei(res._minAmount))
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

var canSponsor =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(contract, groupId, who) {
    var res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return contract.methods.canSponsor(groupId, who).call();

          case 2:
            res = _context2.sent;
            return _context2.abrupt("return", res);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function canSponsor(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.canSponsor = canSponsor;

var newChallengesEvents =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var contract, filter, callback;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contract = _ref3.contract, filter = _ref3.filter, callback = _ref3.callback;
            _context3.next = 3;
            return contract.events.NewChallenge({
              filter: filter
            }, function (_error, event) {
              var _event$returnValues = event.returnValues,
                  challenger = _event$returnValues.challenger,
                  groupId = _event$returnValues.groupId,
                  targetDays = _event$returnValues.targetDays,
                  totalDays = _event$returnValues.totalDays,
                  startTimestamp = _event$returnValues.startTimestamp,
                  amount = _event$returnValues.amount;
              callback && callback({
                proposer: challenger,
                groupId: groupId,
                targetDays: targetDays,
                totalDays: totalDays,
                startTimestamp: startTimestamp,
                amount: amount
              });
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function newChallengesEvents(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.newChallengesEvents = newChallengesEvents;

var getPastChallenges =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref5) {
    var contract, groupId, challenger, finishChallenges, data, i, returnValues;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            contract = _ref5.contract, groupId = _ref5.groupId, challenger = _ref5.challenger;
            _context4.next = 3;
            return getAllPastEvents(contract, 'FinishChallenge', {
              fromBlock: 0,
              filter: {
                groupId: groupId,
                challenger: challenger
              }
            });

          case 3:
            _context4.t0 = _context4.sent;

            if (_context4.t0) {
              _context4.next = 6;
              break;
            }

            _context4.t0 = [];

          case 6:
            finishChallenges = _context4.t0;
            data = [];

            for (i = 0; i < finishChallenges.length; i++) {
              returnValues = finishChallenges[i].returnValues;
              data.push({
                round: returnValues.round,
                targetDays: returnValues.targetDays,
                totalDays: returnValues.totalDays,
                completeDays: returnValues.completeDays,
                startTimestamp: returnValues.startTimestamp,
                sponserSize: 0,
                amount: returnValues.amount,
                totalSponsorAmount: returnValues.totalSponsorAmount,
                status: returnValues.status,
                goal: returnValues.goal
              });
            }

            return _context4.abrupt("return", data);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getPastChallenges(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getPastChallenges = getPastChallenges;

var getNewChallengeGroup =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(contract) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return contract.events.NewChallengeGroup({
              fromBlock: 0
            }, function (_error, event) {
              console.log('event,', event);
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getNewChallengeGroup(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getNewChallengeGroup = getNewChallengeGroup;

var getAllPastEvents =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(contract) {
    var event,
        options,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            event = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 'allEvents';
            options = _args6.length > 2 ? _args6[2] : undefined;
            options = options || {
              fromBlock: 0
            };

            if (contract) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return");

          case 5:
            _context6.next = 7;
            return contract.getPastEvents(event, options);

          case 7:
            return _context6.abrupt("return", _context6.sent);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getAllPastEvents(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getAllPastEvents = getAllPastEvents;

var getPastSponsor =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(contract, round, groupId, challenger) {
    var sponserSize,
        options,
        response,
        sponsers,
        sponsor,
        i,
        _args7 = arguments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            sponserSize = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : 0;
            options = _args7.length > 5 ? _args7[5] : undefined;
            options = options || {
              fromBlock: 0
            };
            response = {
              data: []
            };
            sponsers = [];

            if (!contract) {
              _context7.next = 21;
              break;
            }

            i = 0;

          case 7:
            if (!(i === 0 || sponsor._who)) {
              _context7.next = 21;
              break;
            }

            _context7.prev = 8;
            _context7.next = 11;
            return contract.methods.getSponsor(groupId, challenger, round, i).call();

          case 11:
            sponsor = _context7.sent;
            sponsers.push({
              who: sponsor._who,
              amount: sponsor._amount,
              comment: sponsor._comment
            });
            _context7.next = 18;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](8);
            sponsor = {};

          case 18:
            i++;
            _context7.next = 7;
            break;

          case 21:
            if (sponsers.length) {
              _context7.next = 23;
              break;
            }

            return _context7.abrupt("return", response);

          case 23:
            sponserSize = sponserSize || sponsers.length; // data = sponsers.slice(sponserSize * -1).reverse()

            response.data = sponsers || [];
            return _context7.abrupt("return", response);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[8, 15]]);
  }));

  return function getPastSponsor(_x9, _x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getPastSponsor = getPastSponsor;

var sponsorEvents =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_ref10) {
    var contract, challenger, callback;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            contract = _ref10.contract, challenger = _ref10.challenger, callback = _ref10.callback;
            contract.events.SponsorChallenge({
              filter: {
                challenger: challenger
              }
            }).on('data', function (event) {
              if (callback) {
                var _event$returnValues2 = event.returnValues,
                    _amount = _event$returnValues2.amount,
                    _comment = _event$returnValues2.comment,
                    sponsor = _event$returnValues2.sponsor;
                callback({
                  amount: _amount,
                  comment: _comment,
                  who: sponsor
                });
              }
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function sponsorEvents(_x13) {
    return _ref11.apply(this, arguments);
  };
}();

exports.sponsorEvents = sponsorEvents;

var getChallenge =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_ref12) {
    var _contract$methods;

    var contract, groupId, challenger, round, method, params, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            contract = _ref12.contract, groupId = _ref12.groupId, challenger = _ref12.challenger, round = _ref12.round;
            method = round && round > 0 ? 'getChallenge' : 'getCurrentChallenge';
            params = method === 'getChallenge' ? [groupId, challenger, round] : [groupId, challenger];
            _context9.next = 5;
            return (_contract$methods = contract.methods)[method].apply(_contract$methods, params).call();

          case 5:
            response = _context9.sent;
            return _context9.abrupt("return", (0, _contractUtils.parseChallenge)(response));

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function getChallenge(_x14) {
    return _ref13.apply(this, arguments);
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
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(_ref14) {
    var contract, groupId, address, from, amount, comment;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            contract = _ref14.contract, groupId = _ref14.groupId, address = _ref14.address, from = _ref14.from, amount = _ref14.amount, comment = _ref14.comment;
            _context10.next = 3;
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
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function sponsorChallenge(_x15) {
    return _ref15.apply(this, arguments);
  };
}(); // contract.getPastEvents('allEvents', {fromBlock: 0}, function(error, events){ console.log(events); })
// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })


exports.sponsorChallenge = sponsorChallenge;