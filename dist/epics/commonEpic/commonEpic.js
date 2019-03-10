"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.withdrawEpic = exports.getBalanceEpic = exports.initContractEpic = void 0;

var _action = require("./action");

var _reduxObservable = require("redux-observable");

var _operators = require("rxjs/operators");

var _rxjs = require("rxjs");

var _web = _interopRequireDefault(require("web3"));

var _errorCode = require("../../contants/errorCode");

var _contractUtils = require("../../utils/contractUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// async function transfer(account: string | null) {
//   if (
//     !account ||
//     typeof location === 'undefined' ||
//     location.href.indexOf('localhost') == -1
//   ) {
//     return
//   }
//   await web3.eth.sendTransaction({
//     from: '0x1ce421937a6f59bf58faafe316d23aaed690da18',
//     to: account,
//     value: 2000000000000000000
//   })
//   console.log(`transfer 2 eth to ${account} success!`)
// }
var checkContract = function checkContract(state$) {
  var commonReducer = state$.value.get('common');
  var _ref = [commonReducer.get('txContract'), commonReducer.get('accounts')],
      txContract = _ref[0],
      accounts = _ref[1];
  return txContract !== null && accounts.length > 0;
};

var initContractEpic = function initContractEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.INIT_CONTRACT), (0, _operators.filter)(function () {
    return state$.value.get('common').get('txContract') === null;
  }), (0, _operators.switchMap)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accounts, txWeb3, injectProvider, txContract, network, accountBalance, providers, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accounts = [];
            txWeb3 = null;
            _context.prev = 2;
            txContract = null;
            _context.next = 6;
            return (0, _contractUtils.detectNetwork)(null);

          case 6:
            network = _context.sent;
            accountBalance = '0';

            if (!(typeof web3 === 'undefined' || !process.browser)) {
              _context.next = 12;
              break;
            }

            window.web3 = {};
            _context.next = 21;
            break;

          case 12:
            if (!(window.ethereum || web3.currentProvider)) {
              _context.next = 21;
              break;
            }

            txWeb3 = new _web.default(window.ethereum || web3.currentProvider);
            _context.next = 16;
            return (0, _contractUtils.detectNetwork)(txWeb3);

          case 16:
            network = _context.sent;
            txContract = (0, _contractUtils.newContract)(txWeb3);
            window.contract = txContract;
            _context.next = 21;
            return window.ethereum.enable();

          case 21:
            providers = new _web.default().providers;
            injectProvider = new providers.WebsocketProvider(network);
            web3 = new _web.default(injectProvider);
            _context.prev = 24;

            if (!txWeb3) {
              _context.next = 31;
              break;
            }

            _context.next = 28;
            return txWeb3.eth.getAccounts();

          case 28:
            _context.t0 = _context.sent;
            _context.next = 34;
            break;

          case 31:
            _context.next = 33;
            return web3.eth.getAccounts();

          case 33:
            _context.t0 = _context.sent;

          case 34:
            accounts = _context.t0;

            if (!txContract) {
              _context.next = 39;
              break;
            }

            _context.next = 38;
            return txContract.methods.userBalances(accounts[0]).call();

          case 38:
            accountBalance = _context.sent;

          case 39:
            _context.next = 43;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context["catch"](24);

          case 43:
            contract = (0, _contractUtils.newContract)(web3);
            return _context.abrupt("return", (0, _action.setContract)({
              txContract: txContract,
              contract: contract,
              userAddress: accounts.length ? accounts[0] : null,
              accounts: accounts,
              accountBalance: accountBalance,
              error: null
            }));

          case 47:
            _context.prev = 47;
            _context.t2 = _context["catch"](2);
            return _context.abrupt("return", (0, _action.setPopup)({
              showPop: true,
              messageKey: _errorCode.NO_PROVIDER.key
            }));

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 47], [24, 41]]);
  }))));
};

exports.initContractEpic = initContractEpic;

var getBalanceEpic = function getBalanceEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.GET_BALANCE), (0, _operators.filter)(function () {
    return checkContract(state$);
  }), (0, _operators.switchMap)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var commonReducer, _ref4, txContract, accounts, accountBalance;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commonReducer = state$.value.get('common');
            _ref4 = [commonReducer.get('txContract'), commonReducer.get('accounts')], txContract = _ref4[0], accounts = _ref4[1];
            _context2.prev = 2;
            accountBalance = '0';

            if (!(txContract && accounts.length)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 7;
            return txContract.methods.userBalances(accounts[0]).call();

          case 7:
            accountBalance = _context2.sent;

          case 8:
            return _context2.abrupt("return", (0, _action.setBalance)(accountBalance));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", (0, _action.setPopup)({
              showPop: true,
              popMessage: 'get balance error'
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 11]]);
  }))));
};

exports.getBalanceEpic = getBalanceEpic;

var withdrawEpic = function withdrawEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_action.WITHDRAW_BALANCE), (0, _operators.filter)(function () {
    return checkContract(state$);
  }), (0, _operators.switchMap)(function () {
    var commonReducer = state$.value.get('common');
    var _ref5 = [commonReducer.get('txContract'), commonReducer.get('accounts')],
        txContract = _ref5[0],
        accounts = _ref5[1];
    return (0, _rxjs.from)(txContract.methods.userWithdraw().send({
      from: accounts[0]
    })).pipe((0, _operators.mergeMap)(function (response) {
      return (0, _rxjs.of)((0, _action.setPopup)({
        showPop: true,
        popMessage: 'Tx hash : ' + response.data
      }), (0, _action.getBalance)());
    }), (0, _operators.catchError)(function (err) {
      return (0, _rxjs.of)((0, _action.setPopup)({
        showPop: true,
        messageKey: 'withdraw.error'
      }));
    }));
  }));
};

exports.withdrawEpic = withdrawEpic;
var _default = [initContractEpic, getBalanceEpic, withdrawEpic];
exports.default = _default;