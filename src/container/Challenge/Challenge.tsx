import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { styled } from '@material-ui/styles'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import { Divider } from '@material-ui/core'
import ChallengeInfo from './components/ChallengeInfo'
import { ChallengeStateType } from '@Reducers/challengeReducer'

// import { FormattedMessage } from 'react-intl'
// import CountUp from 'react-countup'

import { ChallengeType } from '@Src/typing/globalTypes'

const { REACT_APP_FONT_COLOR } = process.env

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
})

const StyledDivider = styled(Divider)({
  margin: '0 40px',
  backgroundColor: REACT_APP_FONT_COLOR
})

interface ChallengeProp extends RouteComponentProps, ChallengeType {
  error: boolean
}

export interface RouteParams {
  address: string
  groupId: string
}

const mapStateToProps = (state: Map<string, object>) => {
  const challengeState = state.get('challenge') as ChallengeStateType
  return {
    groupId: 'walk.speed.com',
    ...challengeState.toJS()
  }
}

class Challenge extends React.Component<ChallengeProp> {
  public render() {
    const params = this.props.match.params as RouteParams
    const {
      completeDays,
      totalDays,
      targetDays,
      startDayTimestamp
    } = this.props

    let percent = Math.floor((completeDays * 100) / targetDays)
    percent = percent > 100 ? 100 : percent

    return (
      <React.Fragment>
        <ChallengeContainer>
          <Helmet>
            <title>{params.address}'s coin challenge</title>
            <link rel='canonical' href='http://mysite.com/example' />
          </Helmet>
          <ChallengeCard
            address={params.address}
            groupId={params.groupId}
            startDayTimestamp={startDayTimestamp}
          />
          <ChallengeInfo
            completeDays={completeDays}
            totalDays={totalDays}
            targetDays={targetDays}
            percent={percent}
          />
          {/* <CountUp end={1000} /> */}
        </ChallengeContainer>
        <br />
        <br />
        <StyledDivider variant='inset' component='div' />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(Challenge)
