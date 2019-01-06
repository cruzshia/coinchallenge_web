import React from 'react'
import {
  APP_THEME,
  APP_LIGHT_BG,
  APP_FONT_COLOR_DARK
} from '@Src/contants/themeColor'
import styled from 'styled-components'

import { injectIntl, InjectedIntlProps } from 'react-intl'
import { PieChart } from 'react-d3-components'
import Contract from 'web3/eth/contract'
import { getPastChallenges } from '@Src/contracts/contractService'

const STATUS = ['Succeeded', 'Failed', 'Aborted']

const TimelineCtr = styled('div')({
  background: APP_LIGHT_BG,
  display: 'flex',
  justifyContent: 'center',
  text: {
    color: APP_FONT_COLOR_DARK
  }
})

interface TimelineProp extends InjectedIntlProps {
  contract: Contract | null
  challenger: string
}

interface StatusData {
  x: string
  y: number
}
interface TimelineState {
  challengesStatus: {
    values: StatusData[]
  }
}

function color(label: string) {
  if (label.indexOf('success') >= 0) {
    return '#ff7473'
  } else if (label.indexOf('failed') >= 0) {
    return '#47b8e0'
  }
  return '#ffc952'
}

class HistoryTimeline extends React.PureComponent<TimelineProp, TimelineState> {
  private fetched: boolean = false
  public state = {
    challengesStatus: {
      values: []
    }
  }
  public async componentDidUpdate() {
    const { contract, challenger } = this.props
    if (contract && !this.fetched) {
      this.fetched = true
      let values = []
      const pastStatus: Number[] = await getPastChallenges({
        contract,
        challenger
      })
      for (let i = 0; i < pastStatus.length; i++) {
        if (pastStatus[i]) {
          values.push({
            x: STATUS[i],
            y: pastStatus[i]
          } as StatusData)
        }
      }
      this.setState({
        challengesStatus: {
          values
        }
      })
    }
  }
  public render() {
    const { challengesStatus } = this.state
    if (!challengesStatus.values.length) {
      return null
    }
    return (
      <TimelineCtr>
        <PieChart
          data={this.state.challengesStatus}
          colorScale={(label: string) => color(label)}
          x={(data: any) => `${data.x}:${data.y}`}
          width={600}
          height={400}
          margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
          fill='red'
          string
          tooltipHtml={(x: string) => (
            <span style={{ color: '#34314c' }}>{x}</span>
          )}
        />
      </TimelineCtr>
    )
  }
}

export default injectIntl(HistoryTimeline)
