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

var _contractUtils = require("../../utils/contractUtils");

var _utils = require("../../utils");

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
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(action) {
      var accounts, txWeb3, chain, isDexon, injectProvider, txContract, network, txNetwork, accountBalance, providers, contract;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              accounts = [];
              txWeb3 = null;
              chain = action.payload ? action.payload.chain : 'ethereum';
              isDexon = (0, _utils.isDexon)(chain);
              _context.prev = 4;
              txContract = null;
              _context.next = 8;
              return (0, _contractUtils.detectNetwork)(null, chain);

            case 8:
              network = _context.sent;
              txNetwork = network;
              accountBalance = '0';

              if (!((typeof web3 === 'undefined' || !process.browser) && !window.dexon)) {
                _context.next = 15;
                break;
              }

              window.web3 = {};
              _context.next = 31;
              break;

            case 15:
              if (!(!isDexon && window.ethereum || isDexon && window.dexon)) {
                _context.next = 31;
                break;
              }

              window.web3 = window.web3 || {};
              txWeb3 = new _web.default(isDexon ? window.dexon : window.ethereum);
              _context.next = 20;
              return (0, _contractUtils.detectNetwork)(txWeb3, chain);

            case 20:
              txNetwork = _context.sent;
              txContract = (0, _contractUtils.newContract)(txWeb3);
              window.contract = txContract;
              _context.t0 = !isDexon && window.ethereum;

              if (!_context.t0) {
                _context.next = 27;
                break;
              }

              _context.next = 27;
              return window.ethereum.enable();

            case 27:
              _context.t1 = isDexon && window.dexon;

              if (!_context.t1) {
                _context.next = 31;
                break;
              }

              _context.next = 31;
              return window.dexon.enable();

            case 31:
              providers = new _web.default().providers;
              injectProvider = new providers.WebsocketProvider(network);
              web3 = new _web.default(injectProvider);
              _context.prev = 34;

              if (!txWeb3) {
                _context.next = 41;
                break;
              }

              _context.next = 38;
              return txWeb3.eth.getAccounts();

            case 38:
              _context.t2 = _context.sent;
              _context.next = 44;
              break;

            case 41:
              _context.next = 43;
              return web3.eth.getAccounts();

            case 43:
              _context.t2 = _context.sent;

            case 44:
              accounts = _context.t2;

              if (!txContract) {
                _context.next = 49;
                break;
              }

              _context.next = 48;
              return txContract.methods.userBalances(accounts[0]).call();

            case 48:
              accountBalance = _context.sent;

            case 49:
              _context.next = 53;
              break;

            case 51:
              _context.prev = 51;
              _context.t3 = _context["catch"](34);

            case 53:
              contract = (0, _contractUtils.newContract)(web3);
              return _context.abrupt("return", (0, _action.setContract)({
                txContract: txContract,
                contract: contract,
                userAddress: accounts.length ? accounts[0] : null,
                accounts: accounts,
                accountBalance: accountBalance,
                error: null
              }));

            case 57:
              _context.prev = 57;
              _context.t4 = _context["catch"](4);
              return _context.abrupt("return", (0, _action.setPopup)({
                showPop: true,
                messageKey: "".concat(isDexon ? 'dexonP' : 'p', "roviderNotFound")
              }));

            case 60:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 57], [34, 51]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }()));
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