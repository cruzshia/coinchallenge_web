import React from 'react'
import styled from 'styled-components'
import { sentences } from '@Src/contants/mockSenteces'
import { Decimal } from 'decimal.js'

import { COLOR_BAR } from '@Src/contants/themeColor'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { breakPoint } from '@Src/contants/common'
import { Sponsor } from '@Src/typing/globalTypes'

const SnackbarCtr = styled('div')({
  position: 'relative',
  margin: '10px 0',
  '.bar-item': {
    width: '558px'
  },
  [`@media (max-width:${breakPoint})`]: {
    width: '100%',
    '.bar-item': {
      width: '100%'
    }
  }
})

const SponserCtr = styled('div')({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '.MuiSnackbarContent-message-47': {
    width: '100%'
  }
})

const Address = styled('span')({
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.3)'
})

const InnerContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  [`@media (max-width: ${breakPoint})`]: {
    flexDirection: 'column-reverse'
  }
})

const CoinTxt = styled('div')({
  color: '#ffeb3b',
  textAlign: 'right'
})

const Comment = styled('span')({
  fontSize: '16px'
})

let fakeSponsors: any = []
for (let i = 0; i < 5; i++) {
  fakeSponsors.push({
    comment: sentences[Math.floor(Math.random() * 9)],
    who: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
    amount: new Decimal(Math.random() * 13).toPrecision(8)
  })
}

function Sponsers({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <SponserCtr>
      {sponsors.map((sponser: any, idx: number) => (
        <SnackbarCtr key={idx}>
          <SnackbarContent
            aria-describedby='client-snackbar'
            style={{ backgroundColor: COLOR_BAR[idx % 3] }}
            className='bar-item'
            message={
              <React.Fragment>
                <InnerContent>
                  <Address>{sponser.who}</Address>
                  <CoinTxt>
                    +{sponser.amount} {process.env.REACT_APP_COIN}
                  </CoinTxt>
                </InnerContent>
                <Comment>{sponser.comment}</Comment>
              </React.Fragment>
            }
          />
        </SnackbarCtr>
      ))}
    </SponserCtr>
  )
}

export default Sponsers
