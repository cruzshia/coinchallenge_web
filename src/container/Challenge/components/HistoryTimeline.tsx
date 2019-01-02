import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import { APP_THEME, APP_LIGHT_BG } from '@Src/contants/themeColor'
import styled from 'styled-components'

import Beenhere from '@material-ui/icons/Beenhere'
import Terrain from '@material-ui/icons/Terrain'
import MoodBad from '@material-ui/icons/MoodBad'

import { injectIntl, InjectedIntlProps } from 'react-intl'
import Contract from 'web3/eth/contract'
import { getPastChallenges } from '@Src/contracts/contractService'
import { ChallengeType } from '@Src/typing/globalTypes'
const TimelineCtr = styled('div')({
  background: APP_LIGHT_BG,
  '.vertical-timeline::before': {
    background: '#aab9c2'
  }
})

const IconStyle = {
  start: {
    background: APP_THEME,
    color: '#fff',
    shadow: APP_THEME,
    icon: <Terrain />
  },
  success: {
    background: '#fecd00',
    color: '#fff',
    shadow: '#fecd00',
    icon: <Beenhere />
  },
  failed: {
    background: '#34495d',
    color: '#fff',
    shadow: '#34495d',
    icon: <MoodBad />
  }
}

const StyledVerticalTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    box-shadow: 0 3px 0 ${(props: any) => props.iconStyle.shadow}
  }
}`

interface TimelineProp extends InjectedIntlProps {
  contract: Contract | null
  challenger: string
}

interface TimelineState {
  challenges: ChallengeType[]
}

class HistoryTimeline extends React.PureComponent<TimelineProp, TimelineState> {
  private fetched: boolean = false
  public state = {
    challenges: []
  }
  public componentDidUpdate() {
    const { contract, challenger } = this.props
    if (contract && !this.fetched) {
      this.fetched = true
      getPastChallenges({
        contract,
        challenger
      })
    }
  }
  public render() {
    const { intl } = this.props
    return (
      <TimelineCtr>
        <VerticalTimeline>
          <StyledVerticalTimelineElement
            iconStyle={IconStyle.success}
            icon={IconStyle.success.icon}
          >
            <h3 className='vertical-timeline-element-title'>
              {intl.formatMessage(
                { id: 'finishChallengeDesc' },
                { name: 'walk' }
              )}
            </h3>
            <h4 className='vertical-timeline-element-subtitle'>2018/12/10</h4>
            <p>
              {intl.formatMessage(
                { id: 'successChallengeDesc' },
                { rate: '120%' }
              )}
            </p>
          </StyledVerticalTimelineElement>
          <StyledVerticalTimelineElement
            iconStyle={IconStyle.start}
            icon={IconStyle.start.icon}
          >
            <h3 className='vertical-timeline-element-title'>
              {intl.formatMessage(
                { id: 'startChallengeTitle' },
                { name: 'walk' }
              )}
            </h3>
            <h4 className='vertical-timeline-element-subtitle'>2018/12/08</h4>
            <p>
              {intl.formatMessage(
                { id: 'startChallengeDesc' },
                { targetDays: '10', totalDays: '15' }
              )}
              <br />
              0.345 {process.env.REACT_APP_COIN}
            </p>
          </StyledVerticalTimelineElement>

          {/* <StyledVerticalTimelineElement
            iconStyle={IconStyle.failed}
            icon={IconStyle.failed.icon}
          >
            <h3 className='vertical-timeline-element-title'>
              Content Marketing for Web, Mobile and Social Media
            </h3>
            <h4 className='vertical-timeline-element-subtitle'>Online Course</h4>
            <p>Strategy, Social Media</p>
          </StyledVerticalTimelineElement> */}
        </VerticalTimeline>
      </TimelineCtr>
    )
  }
}

export default injectIntl(HistoryTimeline)
