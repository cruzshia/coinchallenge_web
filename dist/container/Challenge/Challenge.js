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

var _utils = require("../../utils");

var _web = _interopRequireDefault(require("web3"));

var _translation = require("../../translation");

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
  width: '100%',
  overflow: 'hidden',
  marginTop: 0
}));
var StyledGridList = (0, _styledComponents.default)('div')(_defineProperty({
  width: 800,
  zIndex: 1
}, "@media (max-width: ".concat(_common.breakPoint, ")"), {
  width: '100%'
}));
var LoadingBlk = (0, _styledComponents.default)('div')({
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
  a: {
    display: 'inline-block',
    marginBottom: '10px'
  }
});

var deeplinking = function deeplinking(data) {
  branch.deepview({
    channel: 'safari',
    feature: 'deepview',
    $uri_redirect_mode: 2,
    data: _objectSpread({
      $deeplink_path: "challenge/".concat(data.chain, "/").concat(data.groupId, "/").concat(data.address).concat(data.round ? "/".concat(data.round) : ''),
      user_cookie_id: 'coin-challenge'
    }, data, {
      blockchain: data.chain
    })
  }, {
    open_app: true
  });
};

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
        challenger: data.address,
        round: data.round
      }));
    },
    sponserChallenge: function sponserChallenge(payload) {
      return dispatch((0, _action2.sponserChallenge)(_objectSpread({}, payload, {
        dispatch: dispatch
      })));
    },
    setPopup: function setPopup(payload) {
      return dispatch((0, _action.setPopup)(payload));
    },
    initContract: function initContract() {
      return dispatch((0, _action.initContract)());
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "round", undefined);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetched", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sponsorFetched", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "coin", 'ETH');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chain", 'ethereum');

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNewSponsor", function (sponsor) {
      var sponsors = _this.state.sponsors;

      _this.setState({
        sponsors: sponsors.concat([sponsor]),
        sponsorAmount: _this.state.sponsorAmount + Number(_web.default.utils.fromWei(sponsor.amount))
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkWallet", function () {
      var _this$props = _this.props,
          setPopup = _this$props.setPopup,
          txContract = _this$props.txContract,
          intl = _this$props.intl;

      if (!_this.props.txContract) {
        setPopup({
          showPop: true,
          popMessage: intl.formatMessage({
            id: 'providerNotFound'
          })
        });
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSponsor",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var amount, comment, _this$props2, setPopup, minAmount, intl, _this$props3, _txContract, _account, sponserChallenge;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = _ref.amount, comment = _ref.comment;
                _this$props2 = _this.props, setPopup = _this$props2.setPopup, minAmount = _this$props2.minAmount, intl = _this$props2.intl;

                if (amount < minAmount) {
                  setPopup({
                    showPop: true,
                    popMessage: intl.formatMessage({
                      id: 'min.amount.error'
                    }, {
                      amount: minAmount + ' ' + _this.coin
                    })
                  });
                } else {
                  _this$props3 = _this.props, _txContract = _this$props3.txContract, _account = _this$props3.account, sponserChallenge = _this$props3.sponserChallenge;

                  if (_txContract && _account) {
                    sponserChallenge({
                      groupId: _this.groupId,
                      who: _this.address,
                      amount: amount,
                      comment: comment
                    });
                  }
                }

              case 3:
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canSponsor",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              res = false;

              if (!_this.props.contract) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return (0, _contractService.canSponsor)(_this.props.contract, _this.groupId, _this.address);

            case 4:
              res = _context2.sent;

            case 5:
              return _context2.abrupt("return", res);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    var params = _this.props.match.params;
    _this.address = params.address;
    _this.groupId = params.groupId;
    _this.chain = params.chain;
    _this.coin = (0, _common.APP_COIN)(_this.chain);
    _this.round = params.round ? Number(params.round) : undefined;
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
      regeneratorRuntime.mark(function _callee3() {
        var _this$props4, contract, fetchChallenge, sponserSize, targetDays, setPopup, round, isValid, sponsorData;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props4 = this.props, contract = _this$props4.contract, fetchChallenge = _this$props4.fetchChallenge, sponserSize = _this$props4.sponserSize, targetDays = _this$props4.targetDays, setPopup = _this$props4.setPopup, round = _this$props4.round;
                _context3.next = 3;
                return _web.default.utils.isAddress(this.address);

              case 3:
                isValid = _context3.sent;

                if (!(!isValid && !this.fetched)) {
                  _context3.next = 9;
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
                return _context3.abrupt("return");

              case 9:
                if (typeof window !== 'undefined' && isValid) {
                  deeplinking({
                    chain: this.chain,
                    address: this.address,
                    groupId: this.groupId,
                    round: this.round
                  });
                }

                if (!contract) {
                  _context3.next = 23;
                  break;
                }

                if (this.fetched) {
                  _context3.next = 16;
                  break;
                }

                fetchChallenge({
                  chain: this.chain,
                  address: this.address,
                  groupId: this.groupId,
                  round: this.round
                });
                this.fetched = true;
                _context3.next = 23;
                break;

              case 16:
                if (!(!this.sponsorFetched && targetDays > 0)) {
                  _context3.next = 23;
                  break;
                }

                this.sponsorFetched = true;
                _context3.next = 20;
                return (0, _contractService.getPastSponsor)(contract, round, this.groupId, this.address, sponserSize);

              case 20:
                sponsorData = _context3.sent;
                (0, _contractService.sponsorEvents)({
                  contract: contract,
                  groupId: this.groupId,
                  challenger: this.address,
                  callback: this.onNewSponsor
                });
                this.setState({
                  sponsors: sponsorData.data,
                  sponsorAmount: sponsorData.data.reduce(function (accumulator, sponsor) {
                    return accumulator + Number(_web.default.utils.fromWei(sponsor.amount));
                  }, 0)
                });

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      var _this$props5 = this.props,
          history = _this$props5.history,
          location = _this$props5.location,
          initContract = _this$props5.initContract;
      (0, _utils.changeRoute)({
        history: history,
        location: location,
        match: {}
      });
      initContract();
      this.checkAndFetch();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          completeDays = _this$props6.completeDays,
          totalDays = _this$props6.totalDays,
          targetDays = _this$props6.targetDays,
          amount = _this$props6.amount,
          goal = _this$props6.goal,
          intl = _this$props6.intl,
          isCofirmingSponsor = _this$props6.isCofirmingSponsor,
          txhash = _this$props6.txhash,
          contract = _this$props6.contract,
          groupName = _this$props6.groupName,
          groupImage = _this$props6.groupImage;
      intl.locale;
      var goalText = intl.formatMessage({
        id: "group.unit.".concat(this.groupId),
        defaultMessage: ' '
      }, {
        goal: goal
      });
      var title = intl.formatMessage({
        id: "group.title.".concat(this.groupId),
        defaultMessage: 'CoinChallenges'
      }) + ' - ' + goalText;
      var shareDesc = intl.formatMessage({
        id: 'shareDesc'
      }, {
        amount: "".concat(amount, " ").concat(this.coin),
        totalDays: totalDays
      });
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ChallengeContainer, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("meta", {
        property: "og:title",
        content: title
      }), _react.default.createElement("meta", {
        property: "og:description",
        content: shareDesc
      }), _react.default.createElement("meta", {
        property: "og:image",
        content: "".concat((0, _common.hostUrl)(), "share/").concat(this.chain, "/").concat(this.groupId, "/").concat(this.address, "?l=").concat((0, _translation.getLang)())
      }), _react.default.createElement("meta", {
        property: "og:site_name",
        content: "CoinChallengs"
      }), _react.default.createElement("meta", {
        property: "twitter:card",
        content: "summary_large_image"
      }), _react.default.createElement("meta", {
        property: "twitter:site",
        content: "CoinChallengs"
      }), _react.default.createElement("meta", {
        property: "twitter:creator",
        content: "CoinChallengs"
      }), _react.default.createElement("meta", {
        property: "twitter:image:alt",
        content: shareDesc
      })), _react.default.createElement(StyledGridList, null, _react.default.createElement(_ChallengeCard.default, {
        name: groupName,
        goal: totalDays ? goalText : '',
        url: groupImage,
        invalidAddress: this.state.invalidAddress
      }), _react.default.createElement(_ChallengeInfo.default, {
        address: this.address,
        completeDays: completeDays,
        targetDays: targetDays,
        totalDays: totalDays,
        amount: amount,
        invalidAddress: this.state.invalidAddress,
        coin: this.coin
      }), totalDays && this.canSponsor() ? _react.default.createElement(_SponsorButton.default, {
        onSponsor: this.onSponsor,
        checkWallet: this.checkWallet,
        intl: intl
      }) : null, isCofirmingSponsor ? _react.default.createElement(LoadingBlk, null, _react.default.createElement(_Transaction.default, {
        txHash: txhash
      })) : null, _react.default.createElement(_Sponsers.default, {
        sponsors: this.state.sponsors,
        coin: this.coin
      }), _react.default.createElement(_HistoryTimeline.default, {
        contract: contract,
        groupId: this.groupId,
        challenger: this.address,
        coin: this.coin
      }))), _react.default.createElement(_Notifier.default, {
        contract: contract,
        coin: this.coin
      }));
    }
  }]);

  return Challenge;
}(_react.default.Component);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispathToProps)((0, _reactIntl.injectIntl)(Challenge));

exports.default = _default;