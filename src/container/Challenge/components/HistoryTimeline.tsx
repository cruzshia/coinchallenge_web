import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import { APP_THEME } from '@Src/contants/themeColor'

import styled from 'styled-components'

import Beenhere from '@material-ui/icons/Beenhere'
import Terrain from '@material-ui/icons/Terrain'
import MoodBad from '@material-ui/icons/MoodBad'

const TimelineCtr = styled('div')({
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

function HistoryTimeline() {
  return (
    <TimelineCtr>
      <VerticalTimeline>
        <StyledVerticalTimelineElement
          iconStyle={IconStyle.success}
          icon={IconStyle.success.icon}
        >
          <h3 className='vertical-timeline-element-title'>
            Finish a walk challenge
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>2018/12/10</h4>
          <p>Challenge succeed! Complete rate: 120%</p>
        </StyledVerticalTimelineElement>
        <StyledVerticalTimelineElement
          iconStyle={IconStyle.start}
          icon={IconStyle.start.icon}
        >
          <h3 className='vertical-timeline-element-title'>
            Start a walk challenge
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>2018/12/08</h4>
          <p>
            Challenger start a challenge which need complete 10 days in 15 days.
            <br />
            0.345 {process.env.REACT_APP_COIN}
          </p>
        </StyledVerticalTimelineElement>

        <StyledVerticalTimelineElement
          iconStyle={IconStyle.failed}
          icon={IconStyle.failed.icon}
        >
          <h3 className='vertical-timeline-element-title'>
            Content Marketing for Web, Mobile and Social Media
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>Online Course</h4>
          <p>Strategy, Social Media</p>
        </StyledVerticalTimelineElement>
      </VerticalTimeline>
    </TimelineCtr>
  )
}

export default HistoryTimeline
