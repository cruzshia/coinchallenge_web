import React from 'react'
import 'particles.js'
import styled from 'styled-components'

const StyledParticle = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

class Particles extends React.PureComponent {
  public componentDidMount() {
    window.particlesJS.load('particle-body', '/particlesjs-config.json')
  }
  public render() {
    return <StyledParticle id='particle-body' />
  }
}

export default Particles
