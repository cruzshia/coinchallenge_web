"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectNetwork = exports.parseChallenge = exports.newContract = void 0;

var _web = _interopRequireDefault(require("web3"));

var _CoinChallenges = _interopRequireDefault(require("../contracts/CoinChallenges.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
var contractAddress = '0x093240763E9227B30DA751A743B52c0aADC7E945';

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
    var netId, isDexon;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            netId = 0;
            chain = chain || 'ethereum';
            isDexon = chain === 'dexon';

            if (web3) {
              _context.next = 7;
              break;
            }

            netId = isDexon ? 238 : 3;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return web3.eth.net.getId();

          case 9:
            netId = _context.sent;

          case 10:
            _context.t0 = netId;
            _context.next = _context.t0 === 1 ? 13 : _context.t0 === 3 ? 16 : _context.t0 === 238 ? 19 : 22;
            break;

          case 13:
            //main net
            networkAddress = 'wss://mainnet.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
            CHAIN_ADDRESS[chain]('PROD');
            return _context.abrupt("break", 24);

          case 16:
            //ropsten
            networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
            CHAIN_ADDRESS[chain]('TEST');
            return _context.abrupt("break", 24);

          case 19:
            //'DEXON Test Network'
            networkAddress = 'wss://testnet-rpc.dexon.org/ws';
            CHAIN_ADDRESS[chain]('TEST');
            return _context.abrupt("break", 24);

          case 22:
            networkAddress = 'ws://localhost:7545';
            CHAIN_ADDRESS[chain]('LOCAL');

          case 24:
            return _context.abrupt("return", networkAddress);

          case 25:
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
      contractAddress = '0xeEe43e9258D59F118F700aae73a91765A0BD2bcC';
      break;

    case 'TEST':
      contractAddress = '0x093240763E9227B30DA751A743B52c0aADC7E945';
      break;

    default:
      contractAddress = '0x093240763E9227B30DA751A743B52c0aADC7E945';
  }
};

var getDexonContract = function getDexonContract(env) {
  switch (env) {
    case 'PROD':
      contractAddress = '';
      break;

    case 'TEST':
      contractAddress = '0xF1A996ddb41a2BEFA1459EF0482421f3F2295682';
      break;

    default:
      contractAddress = '0xF1A996ddb41a2BEFA1459EF0482421f3F2295682';
  }
};

var CHAIN_ADDRESS = {
  ethereum: getContract,
  dexon: getDexonContract
};