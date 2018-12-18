import React from 'react'
import styled from 'styled-components'
import { Wave } from 'react-animated-text'
import DonateImg from '@Src/images/donation-white.svg'

const CrowdCtr = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const StyledText = styled('span')({
  color: '#fff',
  fontSize: '60px',
  textAlign: 'center'
})

function CrowdInfo() {
  return (
    <CrowdCtr>
      <img src={DonateImg} width='50%' />
      <StyledText>
        +
        <Wave text='5000' speed={2} />
      </StyledText>
    </CrowdCtr>
  )
}

export default CrowdInfo
