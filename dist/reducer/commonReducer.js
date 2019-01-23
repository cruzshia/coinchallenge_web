"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _action = require("../epics/commonEpic/action");

var _action2 = require("../epics/challengeEpic/action");

var _action3 = require("../epics/challengeGroupEpic/action");

var _utils = require("../utils");

var _immutable = require("immutable");

var stateMaker = (0, _immutable.Record)({
  lang: 'en',
  userAddress: null,
  accounts: [],
  txContract: null,
  contract: null,
  loading: true,
  showPop: false,
  popMessage: '',
  messageKey: null,
  isConfirming: false,
  txHash: '',
  error: null
});
var initialState = stateMaker();
exports.initialState = initialState;

var commonReducer = function commonReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _action.SET_CONTRACT:
      var _ref = action.payload,
          _txContract = _ref.txContract,
          _contract = _ref.contract,
          _userAddress = _ref.userAddress,
          _ref$accounts = _ref.accounts,
          _accounts = _ref$accounts === void 0 ? [] : _ref$accounts,
          _error = _ref.error;

      return state.merge({
        txContract: _txContract,
        contract: _contract,
        userAddress: _userAddress,
        accounts: _accounts,
        loading: false,
        error: _error
      });

    case _action.SET_POPUP:
      var payload = action.payload;
      return state.merge({
        showPop: payload.showPop,
        popMessage: payload.popMessage,
        messageKey: payload.messageKey
      });

    case _action2.GET_CAHLLENGE:
    case _action3.CREATE_CHALLENGE_GROUP:
      return state.set('loading', true);

    case _action2.SET_CAHLLENGE:
    case _action3.SET_CREATE_RESULT:
      return state.merge({
        loading: false,
        isConfirming: false
      });

    case _action.CHECK_WALLET:
      if (state.get('txContract') === null) {
        var url = (0, _utils.getMetmaskUrl)();

        if (state.get('accounts').length === 0) {
          return state.merge({
            showPop: true,
            messageKey: 'accountNotFound'
          });
        }

        if (url) {
          window.open(url);
        } else {
          state = state.merge({
            showPop: true,
            messageKey: 'browserNotSupport'
          });
        }
      }

      return state;

    case _action.SET_CONFIRM:
      var _ref2 = action.payload,
          _isConfirming = _ref2.isConfirming,
          _txHash = _ref2.txHash;
      return state.merge({
        isConfirming: _isConfirming,
        txHash: _txHash
      });

    default:
      return state;
  }
};

var _default = commonReducer;
exports.default = _default;