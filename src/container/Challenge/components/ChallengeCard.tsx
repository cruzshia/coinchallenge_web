import React from 'react'
import styled from 'styled-components'
// import { FormattedMessage } from 'react-intl'
import Img from '@Src/images/pic.png'
import Medal from '@Src/images/medal.svg'
import Moment from 'moment'
import { breakPoint } from '@Src/contants/common'
import { RouteParams } from '../Challenge'

const StyledTtitleCtr = styled('div')({
  position: 'relative',
  minHeight: '450px',
  [`@media (max-width: ${breakPoint})`]: {
    minHeight: 0
  }
})

const StyledMedal = styled('img')({
  width: '30px',
  verticalAlign: 'middle',
  marginRight: 10
})

const StyledTitle = styled('span')({
  position: 'absolute',
  top: 0,
  color: '#fff',
  fontSize: '20px',
  padding: '10px',
  background: 'rgba(0, 0, 0, 0.4)',
  lineHeight: '30px',
  width: '100%'
})
interface ChallengeCardProp extends RouteParams {
  startDayTimestamp: number
}

const ChallengeCard = React.memo(
  ({ address, groupId, startDayTimestamp }: ChallengeCardProp) => (
    <React.Fragment>
      {/* <StyledFont>Challenger: {address}</StyledFont> */}
      <StyledTtitleCtr>
        <StyledTitle>
          <StyledMedal src={Medal} />
          {groupId} @{Moment(startDayTimestamp).format('MM/DD')}
        </StyledTitle>
        <img src={Img} width='100%' />
      </StyledTtitleCtr>
    </React.Fragment>
  )
)

export default ChallengeCard
