"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectNetwork = exports.parseChallenge = exports.newContract = void 0;

var _web = _interopRequireDefault(require("web3"));

var _CoinChallenges = _interopRequireDefault(require("../contracts/CoinChallenges.json"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
var contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111';

var newContract = function newContract(web3Interface, address) {
  var newContract = null;

  try {
    newContract = new web3Interface.eth.Contract(_CoinChallenges.default.abi, address || contractAddress, {
      gas: 6000000
    });
  } catch (err) {
    console.log(err);
  }

  return newContract;
};

exports.newContract = newContract;

var parseChallenge = function parseChallenge(response) {
  var challenge = {
    round: Number(response._currentRound),
    targetDays: Number(response._targetDays),
    totalDays: Number(response._totalDays),
    completeDays: Number(response._completeDays),
    startTimestamp: Number(response._startTimestamp) * 1000,
    sponserSize: Number(response._sponsorSize),
    amount: Number(_web.default.utils.fromWei(response._amount)),
    totalSponsorAmount: Number(_web.default.utils.fromWei(response._totalSponsorAmount)),
    goal: response._goal
  };
  return challenge;
};

exports.parseChallenge = parseChallenge;

var detectNetwork =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(web3, chain) {
    var netId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            netId = 0;
            chain = chain || 'ethereum';

            if (web3) {
              _context.next = 6;
              break;
            }

            netId = (0, _.isDexon)(chain) ? 238 : 3;
            _context.next = 9;
            break;

          case 6:
            _context.next = 8;
            return web3.eth.net.getId();

          case 8:
            netId = _context.sent;

          case 9:
            _context.t0 = netId;
            _context.next = _context.t0 === 1 ? 12 : _context.t0 === 3 ? 15 : _context.t0 === 237 ? 18 : _context.t0 === 238 ? 21 : 24;
            break;

          case 12:
            //main net
            networkAddress = 'wss://mainnet.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
            CHAIN_ADDRESS[chain]('PROD');
            return _context.abrupt("break", 26);

          case 15:
            //ropsten
            networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
            CHAIN_ADDRESS[chain]('TEST');
            return _context.abrupt("break", 26);

          case 18:
            //'DEXON main Network'
            networkAddress = 'wss://mainnet-rpc.dexon.org/ws';
            CHAIN_ADDRESS[chain]('PROD');
            return _context.abrupt("break", 26);

          case 21:
            //'DEXON Test Network'
            networkAddress = 'wss://testnet-rpc.dexon.org/ws';
            CHAIN_ADDRESS[chain]('TEST');
            return _context.abrupt("break", 26);

          case 24:
            networkAddress = 'ws://localhost:7545';
            CHAIN_ADDRESS[chain]('LOCAL');

          case 26:
            return _context.abrupt("return", networkAddress);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function detectNetwork(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.detectNetwork = detectNetwork;

var getContract = function getContract(env) {
  switch (env) {
    case 'PROD':
      contractAddress = '0xf7eAF1eFdC121B00dba59e07e87616170a6e7bEC';
      break;

    case 'TEST':
      contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111';
      break;

    default:
      contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111';
  }
};

var getDexonContract = function getDexonContract(env) {
  switch (env) {
    case 'PROD':
      contractAddress = '0xE021C75841a07801d06bA714C51b79C651e0a390';
      break;

    case 'TEST':
      contractAddress = '0x0fc4f5c56299FF58019623c3d7daF6D1c78d7d57';
      break;

    default:
      contractAddress = '0x0fc4f5c56299FF58019623c3d7daF6D1c78d7d57';
  }
};

var CHAIN_ADDRESS = {
  ethereum: getContract,
  dexon: getDexonContract
};