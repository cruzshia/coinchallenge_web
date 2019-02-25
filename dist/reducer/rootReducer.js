"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxImmutable = require("redux-immutable");

var _commonReducer = _interopRequireDefault(require("./commonReducer"));

var _challengeGroupReducer = _interopRequireDefault(require("./challengeGroupReducer"));

var _challengeReducer = _interopRequireDefault(require("./challengeReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _reduxImmutable.combineReducers)({
  common: _commonReducer.default,
  challengeGroup: _challengeGroupReducer.default,
  challenge: _challengeReducer.default
});
var _default = rootReducer;
exports.default = _default;