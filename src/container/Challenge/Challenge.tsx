import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import ChallengeInfo from './components/ChallengeInfo'
import CrowdInfo from './components/CrowdInfo'
import Sponsers from './components/Sponsers'
import { ChallengeStateType } from '@Reducers/challengeReducer'
import { CommonStateType } from '@Reducers/commonReducer'
import { APP_THEME_BACKGROUND } from '@Src/contants/themeColor'
import HistoryTimeline from './components/HistoryTimeline'
import Notifier from './components/Notifier'
import { breakPoint } from '@Src/contants/common'

// import { FormattedMessage } from 'react-intl'
// import CountUp from 'react-countup'
import Contract from 'web3/eth/contract'
import { getChallenge, setChallengeSponsers } from '@Epics/challengeEpic/action'
import { ChallengeType, Sponsor } from '@Src/typing/globalTypes'

import {
  getAllEvents,
  getChellengeSponsors,
  sponsorChallenge
} from '@Src/contracts/contractService'

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

interface InfoCtrProp {
  bgcolor?: string
}
const StyledInfoCtr = styled('div')<InfoCtrProp>`
  display: flex;
  background: ${(props: InfoCtrProp) =>
    props.bgcolor ? props.bgcolor : APP_THEME_BACKGROUND};
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakPoint}) {
    flex-direction: column;
  }
`

const Grid = styled('div')({
  width: '50%',
  paddingBottom: '10px',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%'
  }
})

interface ChallengeProp extends RouteComponentProps, ChallengeType {
  contract: Contract | null
  sponsers: Sponsor[]
  error: boolean
  fetchChallenge: (data: RouteParams) => void
  setChallengeSponsersAction: (sponsors: Sponsor[]) => void
}
export interface RouteParams {
  address: string
  groupId: string
}

const mapStateToProps = (state: Map<string, object>) => {
  const challengeState = state.get('challenge') as ChallengeStateType
  const commonState = state.get('common') as CommonStateType
  return {
    contract: commonState.get('contract'),
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
  setChallengeSponsersAction: (sponsors: Sponsor[]) =>
    dispatch(setChallengeSponsers({ sponsors }))
})

class Challenge extends React.Component<ChallengeProp> {
  public address: string = ''
  public groupId: string = ''
  public fetched: boolean = false
  public sponsorFetched: boolean = false

  constructor(props: ChallengeProp) {
    super(props)
    const params = this.props.match.params as RouteParams
    this.address = params.address
    this.groupId = params.groupId
  }

  private async checkAndFetch() {
    const {
      contract,
      fetchChallenge,
      setChallengeSponsersAction,
      sponserSize,
      targetDays
    } = this.props
    if (contract) {
      if (!this.fetched) {
        fetchChallenge({
          address: this.address,
          groupId: this.groupId
        })
        this.fetched = true
      } else if (!this.sponsorFetched && targetDays > 0) {
        // sponsorChallenge({
        //   contract,
        //   groupId: this.groupId,
        //   address: this.address
        // })
        // getAllEvents(this.props.contract)
        this.sponsorFetched = true
        const sponsors = await getChellengeSponsors({
          contract,
          groupId: this.groupId,
          address: this.address,
          sponsorSize: sponserSize
        })
        setChallengeSponsersAction(sponsors)
      }
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
      sponsers
    } = this.props

    let percent = targetDays ? Math.floor((completeDays * 100) / targetDays) : 0
    percent = percent > 100 ? 100 : percent

    return (
      <React.Fragment>
        <ChallengeContainer>
          <Helmet>
            <title>{this.address}'s coin challenge</title>
            <link rel='canonical' href='http://mysite.com/example' />
          </Helmet>

          <StyledGridList>
            <ChallengeCard
              address={this.address}
              groupId={this.groupId}
              startDayTimestamp={startDayTimestamp}
            />
            <StyledInfoCtr>
              <Grid>
                <ChallengeInfo
                  completeDays={completeDays}
                  totalDays={totalDays}
                  targetDays={targetDays}
                  percent={percent}
                />
              </Grid>
              <Grid>
                <CrowdInfo />
              </Grid>
            </StyledInfoCtr>
            <Sponsers sponsors={sponsers} />
            <HistoryTimeline />
          </StyledGridList>
          {/* <CountUp end={1000} /> */}
        </ChallengeContainer>
        <Notifier />
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Challenge)
