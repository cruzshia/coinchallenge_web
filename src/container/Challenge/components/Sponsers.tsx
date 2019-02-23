import React from 'react'
import styled from 'styled-components'

import { APP_THEME, APP_LIGHT_BG } from '@Src/contants/themeColor'
import { breakPoint } from '@Src/contants/common'
import { Sponsor } from '@Src/typing/globalTypes'
import web3 from 'web3'

const SponserCtr = styled('div')({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const BarCtr = styled('div')({
  width: 'calc(80% - 20px)',
  minWidth: '558px',
  background: APP_LIGHT_BG,
  marginBottom: '15px',
  [`@media (max-width: ${breakPoint})`]: {
    width: '100%',
    minWidth: 0,
    padding: '0 10px'
  }
})

const Address = styled('span')({
  fontSize: '12px',
  paddingRight: '10px',
  color: 'rgba(0, 0, 0, 0.3)'
})

const CoinTxt = styled('div')({
  color: APP_THEME,
  textAlign: 'right'
})

const Comment = styled('span')({
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.8)'
})

const SponsorTitle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '5px',
  [`@media (max-width: ${breakPoint})`]: {
    alignItems: 'center',
    [Address]: {
      flex: 3,
      wordBreak: 'break-all'
    },
    [CoinTxt]: {
      flex: 1
    }
  }
})

function Sponsers({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <SponserCtr>
      {sponsors.map((sponsor: any, idx: number) => (
        <BarCtr key={idx}>
          <SponsorTitle>
            <Address>{sponsor.who}</Address>
            <CoinTxt>
              +{Number(web3.utils.fromWei(sponsor.amount))}{' '}
              {process.env.REACT_APP_COIN}
            </CoinTxt>
          </SponsorTitle>
          <div>
            <Comment>{sponsor.comment}</Comment>
          </div>
        </BarCtr>
      ))}
    </SponserCtr>
  )
}

export default Sponsers
