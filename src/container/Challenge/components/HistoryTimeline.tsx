import React from 'react'
import { APP_LIGHT_BG, APP_THEME } from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import styled from 'styled-components'

import { injectIntl, InjectedIntlProps } from 'react-intl'
import Contract from 'web3/eth/contract'
import { getPastChallenges } from '@Src/contracts/contractService'
import { ChallengeType } from '@Src/typing/globalTypes'
import { formatNumber } from '@Src/utils'
import web3 from 'web3'
import moment from 'moment'

const STATUS = ['Succeeded', 'Failed', 'Aborted']
const STATUS_COLOR = [
  'rgba(0, 0, 0, 0.6)',
  'rgba(0, 0, 0, 0.6)',
  'rgba(0, 0, 0, 0.6)'
]

interface HistoryProp extends InjectedIntlProps {
  contract: Contract | null
  challenger: string
}

interface HistoryState {
  challenges: Array<ChallengeType>
}

const Title = styled('div')({
  fontSize: 30,
  color: 'rgba(0, 0, 0, 0.8)',
  textAlign: 'center',
  margin: '20px 0 10px',
  paddingBottom: '10px',
  borderBottom: `3px solid ${APP_THEME}`
})

const TimelineCtr = styled('div')({
  background: APP_LIGHT_BG,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const HistoryCtr = styled('div')({
  width: '80%',
  minWidth: '558px',
  display: 'flex',
  margin: '10px 0',
  justifyContent: 'space-between',
  color: 'rgba(0, 0, 0, 0.6)',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%',
    minWidth: 0,
    padding: '0 10px'
  }
})

const Amount = styled('span')({
  color: 'rgba(0, 0, 0, 0.8)',
  lineHeight: '20px'
})

class HistoryTimeline extends React.PureComponent<HistoryProp, HistoryState> {
  private fetched: boolean = false
  public state = {
    challenges: []
  }
  public async componentDidUpdate() {
    const { contract, challenger } = this.props
    if (contract && !this.fetched) {
      const pastChallengs = await getPastChallenges({ contract, challenger })
      this.fetched = true
      this.setState({
        challenges: pastChallengs
      })
    }
  }
  public render() {
    const { intl } = this.props
    const { challenges } = this.state

    return (
      <TimelineCtr>
        <Title>
          {challenges.length
            ? intl.formatMessage({
                id: 'history'
              })
            : null}
        </Title>
        {challenges.map((challenge: ChallengeType, idx: number) => {
          const status = challenge.status || 0
          return (
            <HistoryCtr key={`history-${idx}`}>
              <div>
                {moment(challenge.startTimestamp * 1000).format(
                  intl.formatMessage({ id: 'challenge.history.date.formate' })
                )}
                <br />
                <Amount>
                  {formatNumber(Number(web3.utils.fromWei(challenge.amount)))}{' '}
                  {process.env.REACT_APP_COIN}
                </Amount>
              </div>
              <div style={{ color: STATUS_COLOR[status] }}>
                {intl.formatMessage({
                  id: 'status.' + STATUS[status]
                })}
              </div>
            </HistoryCtr>
          )
        })}
      </TimelineCtr>
    )
  }
}

export default injectIntl(HistoryTimeline)
