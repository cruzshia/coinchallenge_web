"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reduxLogger = require("redux-logger");

var _reducer = _interopRequireDefault(require("../reducer"));

var _reduxObservable = require("redux-observable");

var _epics = _interopRequireDefault(require("../epics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epicMiddleware = (0, _reduxObservable.createEpicMiddleware)();
var middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push((0, _reduxLogger.createLogger)({
    stateTransformer: function stateTransformer(state) {
      return state.toJS();
    }
  }));
}

var store = (0, _redux.createStore)(_reducer.default, _redux.applyMiddleware.apply(void 0, middlewares));
epicMiddleware.run(_epics.default);
var _default = store;
exports.default = _default;