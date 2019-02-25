"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _action = require("../epics/challengeEpic/action");

var _immutable = require("immutable");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState;

if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
  initState = window.__PRELOADED_STATE__.challenge;
} else {
  initState = {
    completeDays: 0,
    targetDays: 0,
    totalDays: 0,
    startTimestamp: 0,
    sponserSize: 0,
    amount: 0,
    goal: '',
    minAmount: 0
  };
}

var stateMaker = (0, _immutable.Record)(_objectSpread({
  sponsers: [],
  isCofirmingSponsor: false,
  txhash: '',
  groupName: '',
  groupImage: ''
}, initState));
var initialState = stateMaker();
exports.initialState = initialState;

var challengeReducer = function challengeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _action.SET_CAHLLENGE:
      return state.merge(_objectSpread({}, action.payload));

    case _action.SET_CAHLLENGE_SPONSERS:
      var payload = action.payload;
      return state.set('sponsers', payload.sponsors);

    case _action.SET_COFIRM_SPONSOR:
      var _ref = action.payload,
          _isCofirmingSponsor = _ref.isCofirmingSponsor,
          _txhash = _ref.txhash;
      return state.merge({
        isCofirmingSponsor: _isCofirmingSponsor,
        txhash: _txhash
      });

    case _action.SET_CAHLLENGE_GROUP:
      var _ref2 = action.payload,
          _groupName = _ref2.groupName,
          _groupImage = _ref2.groupImage,
          _minAmount = _ref2.minAmount;
      return state.merge({
        groupName: _groupName,
        groupImage: _groupImage,
        minAmount: _minAmount
      });

    default:
      return state;
  }
};

var _default = challengeReducer;
exports.default = _default;