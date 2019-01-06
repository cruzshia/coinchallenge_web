import React from 'react'
import styled from 'styled-components'
// import { FormattedMessage } from 'react-intl'
import { breakPoint } from '@Src/contants/common'
import LogoImg from '@Src/images/logo.png'

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

const Logo = styled('img')({
  display: 'block',
  width: '50%',
  margin: '0 auto'
})
interface ChallengeCardProp {
  groupId: string
  name: string
  url: string
  invalidAddress: boolean
}

const ChallengeCard = React.memo(
  ({ groupId, name, url, invalidAddress }: ChallengeCardProp) => (
    <React.Fragment>
      {/* <StyledFont>Challenger: {address}</StyledFont> */}
      <StyledTtitleCtr>
        <StyledTitle>{invalidAddress ? '' : name}</StyledTitle>
        {invalidAddress || url === '' ? (
          <Logo src={LogoImg} />
        ) : (
          <img src={url} width='100%' />
        )}
      </StyledTtitleCtr>
    </React.Fragment>
  )
)

export default ChallengeCard
