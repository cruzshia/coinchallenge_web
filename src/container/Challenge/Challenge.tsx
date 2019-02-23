import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import ChallengeInfo from './components/ChallengeInfo'
import SponsorButton from './components/SponsorButton'
import Sponsers from './components/Sponsers'
import { ChallengeStateType } from '@Reducers/challengeReducer'
import { CommonStateType } from '@Reducers/commonReducer'
import HistoryTimeline from './components/HistoryTimeline'
import Notifier from './components/Notifier'
import { breakPoint } from '@Src/contants/common'

import Contract from 'web3/eth/contract'
import { checkWallet, setPopup, SetPopProps } from '@Epics/commonEpic/action'
import {
  getChallenge,
  sponserChallenge,
  SponserProp
} from '@Epics/challengeEpic/action'
import { ChallengeType, Sponsor } from '@Src/typing/globalTypes'

import { injectIntl, InjectedIntlProps } from 'react-intl'
import Transaction from '@Components/Transaction'
import { changeRoute } from '@Utils/index'
import web3 from 'web3'

import { sponsorEvents, getPastSponsor } from '@Src/contracts/contractService'
import moment from 'moment'

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 0
  }
})

const StyledGridList = styled('div')({
  width: 800,
  zIndex: 1,
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%'
  }
})

const LoadingBlk = styled('div')({
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
  a: {
    display: 'inline-block',
    marginBottom: '10px'
  }
})

interface ChallengeProp
  extends RouteComponentProps,
    ChallengeType,
    InjectedIntlProps {
  txContract: Contract | null
  contract: Contract | null
  account: string | null
  error: boolean
  isCofirmingSponsor: boolean
  txhash: string
  groupName: string
  groupImage: string
  minAmount: number
  startTimestamp: number
  fetchChallenge: (data: RouteParams) => void
  sponserChallenge: (payload: SponserProp) => void
  setChallengeSponsersAction: (sponsors: Sponsor[]) => void
  checkWallet: () => void
  setPopup: (payload: SetPopProps) => void
}

interface ChallengeState {
  sponsors: Sponsor[]
  sponsorAmount: number
  invalidAddress: boolean
}
export interface RouteParams {
  address: string
  groupId: string
}

const mapStateToProps = (state: Map<string, object>) => {
  const challengeState = state.get('challenge') as ChallengeStateType
  const commonState = state.get('common') as CommonStateType
  return {
    txContract: commonState.get('txContract'),
    contract: commonState.get('contract'),
    account: commonState.get('userAddress'),
    ...challengeState.toJS()
  }
}

const mapDispathToProps = (dispatch: Dispatch) => ({
  fetchChallenge: (data: RouteParams) =>
    dispatch(
      getChallenge({
        groupId: data.groupId,
        challenger: data.address
      })
    ),
  sponserChallenge: (payload: SponserProp) =>
    dispatch(
      sponserChallenge({
        ...payload,
        dispatch
      })
    ),
  checkWallet: () => dispatch(checkWallet()),
  setPopup: (payload: SetPopProps) => dispatch(setPopup(payload))
})

const { REACT_APP_COIN = 'ETH' } = process.env
class Challenge extends React.Component<ChallengeProp, ChallengeState> {
  public address: string = ''
  public groupId: string = ''
  public fetched: boolean = false
  public sponsorFetched: boolean = false

  constructor(props: ChallengeProp) {
    super(props)
    const params = this.props.match.params as RouteParams
    this.address = params.address
    this.groupId = params.groupId
    this.state = {
      sponsors: [],
      sponsorAmount: 0,
      invalidAddress: false
    }
  }

  private onNewSponsor = (sponsor: Sponsor) => {
    const sponsors = this.state.sponsors
    this.setState({
      sponsors: [sponsor].concat(sponsors),
      sponsorAmount:
        this.state.sponsorAmount + Number(web3.utils.fromWei(sponsor.amount))
    })
  }

  private async checkAndFetch() {
    const {
      contract,
      fetchChallenge,
      sponserSize,
      targetDays,
      setPopup
    } = this.props
    const isValid = await web3.utils.isAddress(this.address)
    if (!isValid && !this.fetched) {
      setPopup({
        showPop: true,
        messageKey: 'invalidAddress'
      })
      this.setState({
        invalidAddress: true
      })
      this.fetched = true
      return
    }

    if (contract) {
      if (!this.fetched) {
        fetchChallenge({
          address: this.address,
          groupId: this.groupId
        })
        this.fetched = true
      } else if (!this.sponsorFetched && targetDays > 0) {
        this.sponsorFetched = true
        const sponsorData = await getPastSponsor(
          contract,
          this.groupId,
          this.address,
          sponserSize
        )
        sponsorEvents({
          contract,
          challenger: this.address,
          callback: this.onNewSponsor
        })

        this.setState({
          sponsors: sponsorData.data,
          sponsorAmount: sponsorData.data.reduce((accumulator, sponsor) => {
            return accumulator + Number(web3.utils.fromWei(sponsor.amount))
          }, 0)
        })
      }
    }
  }

  private onSponsor = async ({
    amount,
    comment
  }: {
    amount: number
    comment: string
  }) => {
    const { setPopup, checkWallet, minAmount, intl } = this.props
    if (amount < minAmount) {
      setPopup({
        showPop: true,
        popMessage: intl.formatMessage(
          { id: 'min.amount.error' },
          {
            amount: minAmount + ' ' + REACT_APP_COIN
          }
        )
      })
    } else {
      checkWallet()
      const { txContract, account, sponserChallenge } = this.props
      if (txContract && account) {
        sponserChallenge({
          groupId: this.groupId,
          who: this.address,
          amount,
          comment
        })
      }
    }
  }

  private canSponsor = () => {
    const { completeDays, targetDays, totalDays, startTimestamp } = this.props
    const diffDaysFromStart = moment().diff(moment(startTimestamp), 'd')
    const failedDays = diffDaysFromStart - completeDays
    return failedDays <= totalDays - targetDays
  }

  public componentDidUpdate() {
    this.checkAndFetch()
  }

  public componentDidMount() {
    const { history, location } = this.props
    changeRoute({ history, location, match: {} })
    this.checkAndFetch()
  }

  public render() {
    const {
      completeDays,
      totalDays,
      targetDays,
      amount,
      goal,
      intl,
      isCofirmingSponsor,
      txhash,
      contract,
      groupName,
      groupImage
    } = this.props

    const goalText = intl.formatMessage(
      { id: `group.unit.${this.groupId}`, defaultMessage: '' },
      { goal }
    )

    const title =
      intl.formatMessage({
        id: `group.title.${this.groupId}`,
        defaultMessage: 'CoinChallenges'
      }) +
      ' - ' +
      goalText

    const shareDesc = intl.formatMessage(
      {
        id: 'shareDesc'
      },
      { amount: `${amount} ${REACT_APP_COIN}`, totalDays }
    )

    return (
      <React.Fragment>
        <ChallengeContainer>
          <Helmet>
            <title>{title}</title>
            <meta property='og:title' content={title} />
            <meta property='og:description' content={shareDesc} />
            <meta property='og:image' content={groupImage} />
            <meta property='og:site_name' content='CoinChallengs' />
            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:site' content='CoinChallengs' />
            <meta property='twitter:creator' content='CoinChallengs' />
            <meta property='twitter:image:alt' content={shareDesc} />
          </Helmet>
          <StyledGridList>
            <ChallengeCard
              name={groupName}
              goal={goalText}
              url={groupImage}
              invalidAddress={this.state.invalidAddress}
            />
            <ChallengeInfo
              address={this.address}
              completeDays={completeDays}
              targetDays={targetDays}
              totalDays={totalDays}
              amount={amount}
              sponsorAmount={this.state.sponsorAmount}
              invalidAddress={this.state.invalidAddress}
            />
            {totalDays && this.canSponsor() ? (
              <SponsorButton onSponsor={this.onSponsor} intl={intl} />
            ) : null}
            {isCofirmingSponsor ? (
              <LoadingBlk>
                <Transaction txHash={txhash} />
              </LoadingBlk>
            ) : null}
            <Sponsers sponsors={this.state.sponsors} />
            <HistoryTimeline contract={contract} challenger={this.address} />
          </StyledGridList>
        </ChallengeContainer>
        <Notifier contract={contract} />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(injectIntl(Challenge))
