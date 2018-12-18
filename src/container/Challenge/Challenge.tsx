import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import ChallengeCard from './components/ChallengeCard'
import ChallengeInfo from './components/ChallengeInfo'
import CrowdInfo from './components/CrowdInfo'
import Sponsers from './components/Sponsers'
import { ChallengeStateType } from '@Reducers/challengeReducer'
import { APP_THEME_BACKGROUND } from '@Src/contants/themeColor'

// import { FormattedMessage } from 'react-intl'
// import CountUp from 'react-countup'

import { ChallengeType } from '@Src/typing/globalTypes'

const ChallengeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px'
})

const StyledGridList = styled('div')({
  width: 800
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
`

const Grid = styled('div')({
  width: '50%',
  paddingBottom: '10px'
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

          <StyledGridList>
            <ChallengeCard
              address={params.address}
              groupId={params.groupId}
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
            <Sponsers Container={StyledInfoCtr} Grid={Grid} />
          </StyledGridList>
          {/* <CountUp end={1000} /> */}
        </ChallengeContainer>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(Challenge)
