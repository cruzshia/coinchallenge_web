"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initContractEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _web = _interopRequireDefault(require("web3"));

var _CoinChallenges = _interopRequireDefault(require("../../contracts/CoinChallenges.json"));

var _errorCode = require("../../contants/errorCode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initContractEpic = function initContractEpic(action$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.INIT_CONTRACT), (0, _operators.switchMap)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accounts, errorAction, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errorAction = (0, _action.setContract)({
              contract: null,
              userAddress: null,
              error: _errorCode.NO_PROVIDER
            });
            _context.prev = 1;

            if (!(typeof web3 !== 'undefined')) {
              _context.next = 12;
              break;
            }

            web3 = new _web.default(new _web.default.providers.WebsocketProvider('ws://localhost:7545'));
            _context.next = 6;
            return web3.eth.getAccounts();

          case 6:
            accounts = _context.sent;
            contract = new web3.eth.Contract(_CoinChallenges.default.abi, '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c', {
              gas: 4600000
            });
            window.contract = contract;
            return _context.abrupt("return", (0, _action.setContract)({
              contract: contract,
              userAddress: accounts.length ? accounts[0] : null,
              accounts: accounts,
              error: null
            }));

          case 12:
            return _context.abrupt("return", errorAction);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", errorAction);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 15]]);
  }))));
};

exports.initContractEpic = initContractEpic;
var _default = [initContractEpic];
exports.default = _default;
//# sourceMappingURL=commonEpic.js.map