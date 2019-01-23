"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHelmet = require("react-helmet");

var _ChallengeCard = _interopRequireDefault(require("./components/ChallengeCard"));

var _ChallengeInfo = _interopRequireDefault(require("./components/ChallengeInfo"));

var _SponsorButton = _interopRequireDefault(require("./components/SponsorButton"));

var _Sponsers = _interopRequireDefault(require("./components/Sponsers"));

var _HistoryTimeline = _interopRequireDefault(require("./components/HistoryTimeline"));

var _Notifier = _interopRequireDefault(require("./components/Notifier"));

var _common = require("../../contants/common");

var _action = require("../../epics/commonEpic/action");

var _action2 = require("../../epics/challengeEpic/action");

var _reactIntl = require("react-intl");

var _Transaction = _interopRequireDefault(require("../../components/Transaction"));

var _web = _interopRequireDefault(require("web3"));

var _contractService = require("../../contracts/contractService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChallengeContainer = (0, _styledComponents.default)('div')(_defineProperty({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  marginTop: 0
}));
var StyledGridList = (0, _styledComponents.default)('div')(_defineProperty({
  width: 800,
  zIndex: 1
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));

var mapStateToProps = function mapStateToProps(state) {
  var challengeState = state.get('challenge');
  var commonState = state.get('common');
  return _objectSpread({
    txContract: commonState.get('txContract'),
    contract: commonState.get('contract'),
    account: commonState.get('userAddress')
  }, challengeState.toJS());
};

var mapDispathToProps = function mapDispathToProps(dispatch) {
  return {
    fetchChallenge: function fetchChallenge(data) {
      return dispatch((0, _action2.getChallenge)({
        groupId: data.groupId,
        challenger: data.address
      }));
    },
    sponserChallenge: function sponserChallenge(payload) {
      return dispatch((0, _action2.sponserChallenge)(_objectSpread({}, payload, {
        dispatch: dispatch
      })));
    },
    checkWallet: function checkWallet() {
      return dispatch((0, _action.checkWallet)());
    },
    setPopup: function setPopup(payload) {
      return dispatch((0, _action.setPopup)(payload));
    }
  };
};

var Challenge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Challenge, _React$Component);

  function Challenge(props) {
    var _this;

    _classCallCheck(this, Challenge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Challenge).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "address", '');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "groupId", '');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetched", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sponsorFetched", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNewSponsor", function (sponsor) {
      var sponsors = _this.state.sponsors;

      _this.setState({
        sponsors: [sponsor].concat(sponsors),
        sponsorAmount: _this.state.sponsorAmount + Number(sponsor.amount)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSponsor",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var amount, comment, _this$props, txContract, account;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = _ref.amount, comment = _ref.comment;

                _this.props.checkWallet();

                _this$props = _this.props, txContract = _this$props.txContract, account = _this$props.account;

                if (txContract && account) {
                  _this.props.sponserChallenge({
                    groupId: _this.groupId,
                    who: _this.address,
                    amount: amount,
                    comment: comment
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    var params = _this.props.match.params;
    _this.address = params.address;
    _this.groupId = params.groupId;
    _this.state = {
      sponsors: [],
      sponsorAmount: 0,
      invalidAddress: false
    };
    return _this;
  }

  _createClass(Challenge, [{
    key: "checkAndFetch",
    value: function () {
      var _checkAndFetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this$props2, contract, fetchChallenge, sponserSize, targetDays, setPopup, isValid, sponsorData;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = this.props, contract = _this$props2.contract, fetchChallenge = _this$props2.fetchChallenge, sponserSize = _this$props2.sponserSize, targetDays = _this$props2.targetDays, setPopup = _this$props2.setPopup;
                _context2.next = 3;
                return _web.default.utils.isAddress(this.address);

              case 3:
                isValid = _context2.sent;

                if (!(!isValid && !this.fetched)) {
                  _context2.next = 9;
                  break;
                }

                setPopup({
                  showPop: true,
                  messageKey: 'invalidAddress'
                });
                this.setState({
                  invalidAddress: true
                });
                this.fetched = true;
                return _context2.abrupt("return");

              case 9:
                if (!contract) {
                  _context2.next = 22;
                  break;
                }

                if (this.fetched) {
                  _context2.next = 15;
                  break;
                }

                fetchChallenge({
                  address: this.address,
                  groupId: this.groupId
                });
                this.fetched = true;
                _context2.next = 22;
                break;

              case 15:
                if (!(!this.sponsorFetched && targetDays > 0)) {
                  _context2.next = 22;
                  break;
                }

                this.sponsorFetched = true;
                _context2.next = 19;
                return (0, _contractService.getPastSponsor)(contract, sponserSize);

              case 19:
                sponsorData = _context2.sent;
                (0, _contractService.sponsorEvents)({
                  contract: contract,
                  challenger: this.address,
                  fromBlock: sponsorData.blockNumber,
                  callback: this.onNewSponsor
                });
                this.setState({
                  sponsors: sponsorData.data,
                  sponsorAmount: sponsorData.data.reduce(function (accumulator, sponsor) {
                    return accumulator + Number(_web.default.utils.fromWei(sponsor.amount));
                  }, 0)
                });

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkAndFetch() {
        return _checkAndFetch.apply(this, arguments);
      }

      return checkAndFetch;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkAndFetch();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkAndFetch();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          completeDays = _this$props3.completeDays,
          totalDays = _this$props3.totalDays,
          targetDays = _this$props3.targetDays,
          amount = _this$props3.amount,
          intl = _this$props3.intl,
          isCofirmingSponsor = _this$props3.isCofirmingSponsor,
          txhash = _this$props3.txhash,
          contract = _this$props3.contract,
          groupName = _this$props3.groupName,
          groupImage = _this$props3.groupImage;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ChallengeContainer, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, intl.formatMessage({
        id: 'docTitleChallenge'
      }, {
        address: this.address
      })), _react.default.createElement("link", {
        rel: "canonical",
        href: "http://mysite.com/example"
      })), _react.default.createElement(StyledGridList, null, _react.default.createElement(_ChallengeCard.default, {
        groupId: this.groupId,
        name: groupName,
        url: groupImage,
        invalidAddress: this.state.invalidAddress
      }), _react.default.createElement(_ChallengeInfo.default, {
        address: this.address,
        completeDays: completeDays,
        targetDays: targetDays,
        totalDays: totalDays,
        amount: amount,
        sponsorAmount: this.state.sponsorAmount,
        invalidAddress: this.state.invalidAddress
      }), totalDays ? _react.default.createElement(_SponsorButton.default, {
        onSponsor: this.onSponsor,
        intl: intl
      }) : null, isCofirmingSponsor ? _react.default.createElement(_Transaction.default, {
        txHash: txhash
      }) : null, _react.default.createElement(_Sponsers.default, {
        sponsors: this.state.sponsors
      }), _react.default.createElement(_HistoryTimeline.default, {
        contract: contract,
        challenger: this.address
      }))), _react.default.createElement(_Notifier.default, {
        contract: contract
      }));
    }
  }]);

  return Challenge;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)((0, _reactIntl.injectIntl)(Challenge));

exports.default = _default;