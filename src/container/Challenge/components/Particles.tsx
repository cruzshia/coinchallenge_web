import React from 'react'
import 'particles.js'

class Particles extends React.PureComponent {
  public componentDidMount() {
    window.particlesJS.load('particle-body', '/particlesjs-config.json')
  }
  public render() {
    return <div id='particle-body' />
  }
}

export default Particles
