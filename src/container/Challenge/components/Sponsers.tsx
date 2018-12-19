import React from 'react'
import styled from 'styled-components'
import Particles from './Particles'
import { sentences } from '@Src/contants/mockSenteces'
import { Decimal } from 'decimal.js'

const SponserContainer = styled('div')({
  position: 'relative',
  minHeight: 300,
  background: 'rgba(0, 0, 0, 0.1)'
})

const StyledTxt = styled('div')({
  fontSize: '12px'
})

const StyledComment = styled('div')({
  flex: 2
})

const StyledCoinTxt = styled('span')({
  color: '#34314c',
  marginLeft: '20px',
  fontSize: '20px',
  fontStyle: 'italic',
  minWidth: '150px'
})

const SponserItem = styled('div')({
  display: 'flex',
  padding: '8px 15px',
  minHeight: '30px',
  fontSize: '16px',
  lineHeight: '20px',
  alignItems: 'center',
  justifyContent: 'space-between'
})

//sentences
let sponsers: any = []
for (let i = 0; i < 5; i++) {
  sponsers.push({
    comment: sentences[Math.floor(Math.random() * 13)],
    who: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
    amount: new Decimal(Math.random() * 13).toPrecision(8)
  })
}

function Sponsers() {
  return (
    <SponserContainer>
      <Particles />
      {sponsers.map((sponser: any, idx: number) => (
        <SponserItem key={idx}>
          <StyledComment>
            {sponser.comment}
            <StyledTxt>{sponser.who}</StyledTxt>
          </StyledComment>
          <StyledCoinTxt>+ {sponser.amount}</StyledCoinTxt>
        </SponserItem>
      ))}
    </SponserContainer>
  )
}

export default Sponsers
