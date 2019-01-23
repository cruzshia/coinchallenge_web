"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _action = require("../epics/challengeGroupEpic/action");

var _immutable = require("immutable");

var stateMaker = (0, _immutable.Record)({
  response: {},
  error: false
});
var initialState = stateMaker();
exports.initialState = initialState;

var challengeGroupReducer = function challengeGroupReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _action.SET_CREATE_RESULT:
      var _ref = action.payload,
          _response = _ref.response,
          _error = _ref.error;
      return state.merge({
        response: _response,
        error: _error
      });

    default:
      return state;
  }
};

var _default = challengeGroupReducer;
exports.default = _default;