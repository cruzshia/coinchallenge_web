"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectNetwork = exports.parseChallenge = exports.newContract = void 0;

var _web = _interopRequireDefault(require("web3"));

var _CoinChallenges = _interopRequireDefault(require("../contracts/CoinChallenges.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
var contractAddress = '0x14120E0d85c9102a7963d511510d259578d948EA';

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
    targetDays: Number(response._targetDays),
    totalDays: Number(response._totalDays),
    completeDays: Number(response._completeDays),
    startTimestamp: Number(response._startTimestamp) * 1000,
    sponserSize: Number(response._sponsorSize),
    amount: Number(_web.default.utils.fromWei(response._amount)),
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
  regeneratorRuntime.mark(function _callee(web3) {
    var netId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            netId = 0;

            if (web3) {
              _context.next = 5;
              break;
            }

            netId = (typeof location === "undefined" ? "undefined" : _typeof(location)) !== undefined && location.host.indexOf('localhost') > -1 ? 0 : 3;
            _context.next = 8;
            break;

          case 5:
            _context.next = 7;
            return web3.eth.net.getId();

          case 7:
            netId = _context.sent;

          case 8:
            _context.t0 = netId;
            _context.next = _context.t0 === 1 ? 11 : _context.t0 === 3 ? 12 : 15;
            break;

          case 11:
            return _context.abrupt("break", 17);

          case 12:
            //ropsten
            networkAddress = 'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f';
            contractAddress = '0x14120E0d85c9102a7963d511510d259578d948EA';
            return _context.abrupt("break", 17);

          case 15:
            networkAddress = 'ws://localhost:7545';
            contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c';

          case 17:
            return _context.abrupt("return", networkAddress);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function detectNetwork(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.detectNetwork = detectNetwork;