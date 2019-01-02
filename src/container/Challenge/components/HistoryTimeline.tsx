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
import { ChallengeType } from '@Src/typing/globalTypes'

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

interface TimelineState {
  challenges: ChallengeType[]
}

const data = {
  values: [{ x: 'success', y: 20 }, { x: 'failed', y: 4 }, { x: 'abort', y: 3 }]
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
        <PieChart
          data={data}
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
