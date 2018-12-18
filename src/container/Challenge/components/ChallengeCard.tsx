import React from 'react'
import styled from 'styled-components'
import { GradientFont } from '@Components/Styled/Common'
// import { FormattedMessage } from 'react-intl'
import Img from '@Src/images/pic.png'
import Medal from '@Src/images/medal.svg'

import { RouteParams } from '../Challenge'

const StyledFont = styled(GradientFont('div'))({
  fontSize: '20px',
  textAlign: 'center',
  marginBottom: '5px'
})

const StyledTtitleCtr = styled('div')({
  position: 'relative'
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
      <StyledFont>Challenger: {address}</StyledFont>
      {/* {groupId}
      {startDayTimestamp} */}
      <StyledTtitleCtr>
        <StyledTitle>
          <StyledMedal src={Medal} />
          {groupId}
        </StyledTitle>
        <img src={Img} width='100%' />
      </StyledTtitleCtr>
    </React.Fragment>
  )
)

export default ChallengeCard
