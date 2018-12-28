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
import { checkWallet } from '@Epics/commonEpic/action'
import {
  getChallenge,
  sponserChallenge,
  SponserProp
} from '@Epics/challengeEpic/action'
import { ChallengeType, Sponsor } from '@Src/typing/globalTypes'

import { injectIntl, InjectedIntlProps } from 'react-intl'

import { sponsorEvents, getPastSponsor } from '@Src/contracts/contractService'

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
  [`@media (max-width: ${breakPoint})`]: {
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

interface ChallengeProp
  extends RouteComponentProps,
    ChallengeType,
    InjectedIntlProps {
  txContract: Contract | null
  contract: Contract | null
  account: string | null
  error: boolean
  fetchChallenge: (data: RouteParams) => void
  sponserChallenge: (payload: SponserProp) => void
  setChallengeSponsersAction: (sponsors: Sponsor[]) => void
  checkWallet: () => void
}

interface ChallengeState {
  sponsors: Sponsor[]
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
    dispatch(sponserChallenge(payload)),
  checkWallet: () => dispatch(checkWallet())
})

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
      sponsors: []
    }
  }

  private onNewSponsor = (sponsor: Sponsor) => {
    const sponsors = this.state.sponsors
    this.setState({
      sponsors: [sponsor].concat(sponsors)
    })
  }

  private async checkAndFetch() {
    const { contract, fetchChallenge, sponserSize, targetDays } = this.props
    if (contract) {
      if (!this.fetched) {
        fetchChallenge({
          address: this.address,
          groupId: this.groupId
        })
        this.fetched = true
      } else if (!this.sponsorFetched && targetDays > 0) {
        const sponsorData = await getPastSponsor(contract, sponserSize)
        sponsorEvents({
          contract,
          challenger: this.address,
          fromBlock: sponsorData.blockNumber,
          callback: this.onNewSponsor
        })
        this.sponsorFetched = true
        this.setState({
          sponsors: sponsorData.data
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
    this.props.checkWallet()
    const { txContract, account } = this.props
    if (txContract && account) {
      this.props.sponserChallenge({
        groupId: this.groupId,
        who: this.address,
        amount,
        comment
      })
    }
  }

  public componentDidUpdate() {
    this.checkAndFetch()
  }

  public componentDidMount() {
    this.checkAndFetch()
  }

  public render() {
    const {
      completeDays,
      totalDays,
      targetDays,
      startDayTimestamp,
      intl
    } = this.props

    let percent = targetDays ? Math.floor((completeDays * 100) / targetDays) : 0
    percent = percent > 100 ? 100 : percent
    return (
      <React.Fragment>
        <ChallengeContainer>
          <Helmet>
            <title>
              {intl.formatMessage(
                { id: 'docTitleChallenge' },
                { address: this.address }
              )}
            </title>
            <link rel='canonical' href='http://mysite.com/example' />
          </Helmet>
          <SponsorButton onSponsor={this.onSponsor} intl={intl} />
          <StyledGridList>
            <ChallengeCard
              address={this.address}
              groupId={this.groupId}
              startDayTimestamp={startDayTimestamp}
            />
            <ChallengeInfo
              completeDays={completeDays}
              targetDays={targetDays}
              totalDays={totalDays}
              percent={percent}
            />
            <Sponsers sponsors={this.state.sponsors} />
            <HistoryTimeline />
          </StyledGridList>
        </ChallengeContainer>
        <Notifier />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(injectIntl(Challenge))
