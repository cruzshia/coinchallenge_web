import React from 'react'
import styled from 'styled-components'

interface SponsersProp {
  Container: React.ComponentType<{ bgcolor: string }>
  Grid: React.ComponentType
}

function Sponsers({ Container, Grid }: SponsersProp) {
  return (
    <React.Fragment>
      <Container bgcolor='transparent' />
    </React.Fragment>
  )
}

export default Sponsers
