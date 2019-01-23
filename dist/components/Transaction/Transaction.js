"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LinearProgress = _interopRequireDefault(require("@material-ui/core/LinearProgress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Transaction(_ref) {
  var txHash = _ref.txHash,
      classNames = _ref.classNames;
  return _react.default.createElement(_react.default.Fragment, null, txHash ? _react.default.createElement("a", {
    href: "https://ropsten.etherscan.io/tx/".concat(txHash),
    target: "_blank"
  }, "Transaction is waiting for confirmation") : null, _react.default.createElement(_LinearProgress.default, {
    color: "secondary",
    className: classNames
  }));
}

var _default = Transaction;
exports.default = _default;