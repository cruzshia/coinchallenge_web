import React from 'react'
import styled from 'styled-components'

import { COLOR_BAR } from '@Src/contants/themeColor'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { breakPoint } from '@Src/contants/common'
import { Sponsor } from '@Src/typing/globalTypes'
import web3 from 'web3'

const SnackbarCtr = styled('div')({
  position: 'relative',
  margin: '10px 0',
  '.bar-item': {
    width: '558px',
    div: {
      width: '100%'
    }
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
  alignItems: 'center'
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
                    +{web3.utils.fromWei(sponser.amount)}{' '}
                    {process.env.REACT_APP_COIN}
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
