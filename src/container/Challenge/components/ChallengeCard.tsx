import React from 'react'
import styled from 'styled-components'
// import { FormattedMessage } from 'react-intl'
import { breakPoint } from '@Src/contants/common'
import LoadingImg from '@Src/images/loading.gif'

const StyledTtitleCtr = styled('div')({
  position: 'relative',
  [`@media (max-width: ${breakPoint})`]: {
    minHeight: 0
  }
})

const StyledTitle = styled('span')({
  position: 'absolute',
  top: 0,
  fontSize: '34px',
  padding: '10px',
  lineHeight: '30px',
  width: '100%'
})
interface ChallengeCardProp {
  groupId: string
  name: string
  url: string
  loading: boolean
}

const ChallengeCard = React.memo(
  ({ groupId, name, url, loading }: ChallengeCardProp) => (
    <React.Fragment>
      {/* <StyledFont>Challenger: {address}</StyledFont> */}
      <StyledTtitleCtr>
        <StyledTitle>{loading ? groupId : name}</StyledTitle>
        <img src={loading ? LoadingImg : url} width='100%' />
      </StyledTtitleCtr>
    </React.Fragment>
  )
)

export default ChallengeCard
