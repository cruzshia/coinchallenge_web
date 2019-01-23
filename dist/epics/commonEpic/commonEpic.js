"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initContractEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _web = _interopRequireDefault(require("web3"));

var _errorCode = require("../../contants/errorCode");

var _contractUtils = require("../../utils/contractUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function transfer(_x) {
  return _transfer.apply(this, arguments);
}

function _transfer() {
  _transfer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(account) {
    var url, transfer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!account || typeof location === 'undefined' || location.href.indexOf('localhost') == -1)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            url = new URL(location.href);
            transfer = url.searchParams.get('transfer');

            if (!transfer) {
              _context2.next = 8;
              break;
            }

            _context2.next = 7;
            return web3.eth.sendTransaction({
              from: '0x1ce421937a6f59bf58faafe316d23aaed690da18',
              to: account,
              value: 2000000000000000000
            });

          case 7:
            console.log("transfer 2 eth to ".concat(account, " success!"));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _transfer.apply(this, arguments);
}

var initContractEpic = function initContractEpic(action$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.INIT_CONTRACT), (0, _operators.switchMap)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accounts, txWeb3, injectProvider, txContract, network, providers, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            txWeb3 = null;
            _context.prev = 1;
            txContract = null;
            _context.next = 5;
            return (0, _contractUtils.detectNetwork)(null);

          case 5:
            network = _context.sent;

            if (!(typeof web3 === 'undefined' || !process.browser)) {
              _context.next = 10;
              break;
            }

            window.web3 = {};
            _context.next = 15;
            break;

          case 10:
            txWeb3 = new _web.default(window.ethereum || web3.currentProvider);
            _context.next = 13;
            return (0, _contractUtils.detectNetwork)(txWeb3);

          case 13:
            network = _context.sent;
            txContract = (0, _contractUtils.newContract)(txWeb3);

          case 15:
            providers = new _web.default().providers;
            injectProvider = new providers.WebsocketProvider(network);
            web3 = new _web.default(injectProvider);

            if (!txWeb3) {
              _context.next = 24;
              break;
            }

            _context.next = 21;
            return txWeb3.eth.getAccounts();

          case 21:
            _context.t0 = _context.sent;
            _context.next = 27;
            break;

          case 24:
            _context.next = 26;
            return web3.eth.getAccounts();

          case 26:
            _context.t0 = _context.sent;

          case 27:
            accounts = _context.t0;
            contract = (0, _contractUtils.newContract)(web3);
            transfer(accounts[0] || null);
            return _context.abrupt("return", (0, _action.setContract)({
              txContract: txContract,
              contract: contract,
              userAddress: accounts.length ? accounts[0] : null,
              accounts: accounts,
              error: null
            }));

          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](1);
            return _context.abrupt("return", (0, _action.setPopup)({
              showPop: true,
              messageKey: _errorCode.NO_PROVIDER.key
            }));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 33]]);
  }))));
};

exports.initContractEpic = initContractEpic;
var _default = [initContractEpic];
exports.default = _default;