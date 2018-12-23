"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _action = require("../epics/commonEpic/action");

var _action2 = require("../epics/challengeEpic/action");

var _action3 = require("../epics/challengeGroupEpic/action");

var _immutable = require("immutable");

var stateMaker = (0, _immutable.Record)({
  userAddress: null,
  accounts: [],
  contract: null,
  loading: true,
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
          _contract = _ref.contract,
          _userAddress = _ref.userAddress,
          _ref$accounts = _ref.accounts,
          _accounts = _ref$accounts === void 0 ? [] : _ref$accounts,
          _error = _ref.error;

      return state.merge({
        contract: _contract,
        userAddress: _userAddress,
        accounts: _accounts,
        loading: false,
        error: _error
      });

    case _action2.GET_CAHLLENGE:
    case _action3.CREATE_CHALLENGE_GROUP:
      return state.set('loading', true);

    case _action2.SET_CAHLLENGE:
    case _action3.SET_CREATE_RESULT:
      return state.set('loading', false);

    default:
      return state;
  }
};

var _default = commonReducer;
exports.default = _default;
//# sourceMappingURL=commonReducer.js.map