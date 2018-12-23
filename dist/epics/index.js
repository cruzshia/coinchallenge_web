"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxObservable = require("redux-observable");

var _commonEpic = _interopRequireDefault(require("./commonEpic"));

var _challengeGroupEpic = _interopRequireDefault(require("./challengeGroupEpic"));

var _challengeEpic = _interopRequireDefault(require("./challengeEpic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = _reduxObservable.combineEpics.apply(void 0, _toConsumableArray(_commonEpic.default).concat(_toConsumableArray(_challengeGroupEpic.default), _toConsumableArray(_challengeEpic.default)));

exports.default = _default;
//# sourceMappingURL=index.js.map