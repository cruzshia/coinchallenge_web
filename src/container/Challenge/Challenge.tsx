import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { styled } from '@material-ui/styles'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import { Divider } from '@material-ui/core'
import ChallengeInfo from './components/ChallengeInfo'

// import { FormattedMessage } from 'react-intl'
// import CountUp from 'react-countup'

import { ChallengeType } from '@Src/typing/globalTypes'

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
})

interface ChallengeProp extends RouteComponentProps, ChallengeType {}

export interface RouteParams {
  address: string
  groupId: string
}

const mockData = {
  completeDays: 8,
  targetDays: 10,
  totalDays: 20,
  startDayTimestamp: 1321231,
  sponserNum: 1
} as ChallengeType

const mapStateToProps = (_state: Map<string, object>) => {
  return {
    groupId: 'walk.speed.com',
    ...mockData
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
        <Divider variant='inset' component='div' />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(Challenge)
