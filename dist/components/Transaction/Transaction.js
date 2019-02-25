"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _loading = _interopRequireDefault(require("../../images/loading.gif"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Div = (0, _styledComponents.default)('div')({
  position: 'relative',
  fontSize: 14,
  lineHeight: '16px'
});
var Img = (0, _styledComponents.default)('img')({
  width: '100px',
  display: 'block',
  margin: '0 auto'
});
var Href = (0, _styledComponents.default)('a')({
  position: 'absolute',
  transform: 'translateX(-50%)',
  left: '50%',
  bottom: '-10px',
  color: '#FF5722'
});

function Transaction(_ref) {
  var txHash = _ref.txHash,
      classNames = _ref.classNames,
      intl = _ref.intl;
  return _react.default.createElement(Div, null, txHash ? _react.default.createElement(Href, {
    href: "https://ropsten.etherscan.io/tx/".concat(txHash),
    target: "_blank"
  }, intl.formatMessage({
    id: 'waitConfirm'
  })) : null, _react.default.createElement(Img, {
    src: _loading.default,
    className: classNames
  }));
}

var _default = (0, _reactIntl.injectIntl)(Transaction);

exports.default = _default;