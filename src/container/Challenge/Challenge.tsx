import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { styled } from '@material-ui/styles'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import Typography from '@material-ui/core/Typography'

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
  completeDays: 5,
  targetDays: 10,
  totalDays: 20,
  startDayTimestamp: 1321231,
  sponserNum: 1
} as ChallengeType

const mapStateToProps = (state: Map<string, object>) => {
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
    return (
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
        <div>
          <Typography variant='h6' gutterBottom>
            CompleteDays
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {completeDays}
          </Typography>
          <Typography variant='h6' gutterBottom>
            TargetDays
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {targetDays}
          </Typography>
          <Typography variant='h6' gutterBottom>
            TotalDays
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {totalDays}
          </Typography>
        </div>
        {/* <CountUp end={1000} /> */}
      </ChallengeContainer>
    )
  }
}

export default connect(mapStateToProps)(Challenge)
