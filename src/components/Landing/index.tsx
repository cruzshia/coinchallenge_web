import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import SnapImg from '@Src/images/habbits.jpg'

const imageDir = '/landing/images/'

const LandingCtr = styled('div')<{ show: boolean }>`
  margin-top: -60px;
  opacity: ${props => (props.show ? 1 : 0)};
`
const StyleId = 'landing-link'

class Landing extends React.PureComponent<InjectedIntlProps> {
  private ref: HTMLElement | null = null
  private headerRef: HTMLElement | null = null
  public state = {
    show: false
  }

  public componentDidMount() {
    if (process.browser) {
      this.headerRef = document.getElementById('project-header')
      this.ref = document.getElementById('particle-body')
      if (this.ref && this.headerRef) {
        this.ref.style.visibility = 'hidden'
        this.headerRef.style.visibility = 'hidden'
      }

      let head = document.getElementsByTagName('head')[0]
      let link = document.createElement('link')

      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = '/landing/styles/layout.css'
      link.id = StyleId

      // MAGIC
      link.onload = () => {
        this.setState({
          show: true
        })
      }
      head.appendChild(link)
    }
  }

  public componentWillUnmount() {
    if (process.browser) {
      const LinkDom = document.getElementById(StyleId)
      LinkDom && LinkDom.remove()
    }

    if (this.ref && this.headerRef) {
      this.ref.style.visibility = 'visible'
      this.headerRef.style.visibility = 'visible'
    }
  }

  public render() {
    const { intl } = this.props
    return (
      <LandingCtr show={this.state.show}>
        {/* ################################################################################################ */}
        {/* ################################################################################################ */}
        {/* ################################################################################################ */}
        {/* Top Background Image Wrapper */}
        {this.state.show ? (
          <React.Fragment>
            <div
              className='bgded'
              style={{
                backgroundImage: `url("${imageDir}backgrounds/walk.jpg")`
              }}
            >
              {/* ################################################################################################ */}
              <div className='wrapper row1'>
                <header id='header' className='hoc clear'>
                  {/* ################################################################################################ */}
                  <div id='logo' className='fl_left'>
                    <h1>
                      <a href='index.html'>CoinChallenges</a>
                    </h1>
                  </div>
                  <nav id='mainav' className='fl_right'>
                    <ul className='clear'>
                      <li>
                        <Link to='/'>Home</Link>
                      </li>
                      <li>
                        <Link to='/create'>create</Link>
                      </li>
                    </ul>
                  </nav>
                  {/* ################################################################################################ */}
                </header>
              </div>
              {/* ################################################################################################ */}
              {/* ################################################################################################ */}
              {/* ################################################################################################ */}
              <section id='pageintro' className='hoc clear'>
                <div>
                  {/* ################################################################################################ */}
                  <h2 className='heading'>
                    {intl.formatMessage({ id: 'landing.start.title' })}
                    <br />
                    <strong>
                      {intl.formatMessage({ id: 'landing.start.subtitle' })}
                    </strong>
                  </h2>
                  <p>{intl.formatMessage({ id: 'landing.start.desc' })}</p>
                  <footer>
                    <ul className='nospace inline pushright'>
                      <li>
                        <a className='btn' href='#'>
                          Download App
                        </a>
                      </li>
                    </ul>
                  </footer>
                  {/* ################################################################################################ */}
                </div>
              </section>
              {/* ################################################################################################ */}
            </div>
            {/* End Top Background Image Wrapper */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            <div className='wrapper row3'>
              <main className='hoc container clear btmpad-none'>
                {/* main body */}
                {/* ################################################################################################ */}
                <div className='sectiontitle center'>
                  <h6 className='heading'>
                    {intl.formatMessage({ id: 'landing.blocks.title' })}
                  </h6>
                  <p>{intl.formatMessage({ id: 'landing.blocks.desc' })}</p>
                </div>
                <ul className='nospace group center btmspace-80'>
                  <li className='one_third first'>
                    <article>
                      <i className='btmspace-30 fa fa-3x fa-apple' />
                      <h6 className='heading font-x1'>
                        {intl.formatMessage({ id: 'landing.block1.title' })}
                      </h6>
                      <p className='btmspace-30'>
                        {intl.formatMessage({ id: 'landing.block1.desc' })}
                      </p>
                    </article>
                  </li>
                  <li className='one_third'>
                    <article>
                      <i className='btmspace-30 fa fa-3x fa-code' />
                      <h6 className='heading font-x1'>
                        {intl.formatMessage({ id: 'landing.block2.title' })}
                      </h6>
                      <p className='btmspace-30'>
                        {intl.formatMessage({ id: 'landing.block2.desc' })}
                      </p>
                    </article>
                  </li>
                  <li className='one_third'>
                    <article>
                      <i className='btmspace-30 fa fa-3x fa-calendar-check-o' />
                      <h6 className='heading font-x1'>
                        {intl.formatMessage({ id: 'landing.block3.title' })}
                      </h6>
                      <p className='btmspace-30'>
                        {intl.formatMessage({ id: 'landing.block3.desc' })}
                      </p>
                    </article>
                  </li>
                </ul>
                <figure>
                  <img src={SnapImg} alt='' />
                </figure>
                {/* ################################################################################################ */}
                {/* / main body */}
                <div className='clear' />
              </main>
            </div>
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            <div
              className='wrapper bgded overlay coloured'
              style={{
                backgroundImage: 'url("images/demo/backgrounds/02.png")'
              }}
            >
              <section className='hoc container clear'>
                {/* ################################################################################################ */}
                <div className='sectiontitle center'>
                  <h6 className='heading'>Tempor turpis pede</h6>
                  <p>Dictum ipsum vel auctor leo est tincidunt est cras.</p>
                </div>
                <ul className='nospace group infoboxes'>
                  <li className='one_third first'>
                    <article className='infobox'>
                      <i className='fa fa-codepen' />
                      <p>
                        <a href='#'>View Details</a>
                      </p>
                      <h6>Lectus nullam et diam</h6>
                    </article>
                  </li>
                  <li className='one_third'>
                    <article className='infobox'>
                      <i className='fa fa-scissors' />
                      <p>
                        <a href='#'>View Details</a>
                      </p>
                      <h6>Non dui consequat pulvinar</h6>
                    </article>
                  </li>
                  <li className='one_third'>
                    <article className='infobox'>
                      <i className='fa fa-crosshairs' />
                      <p>
                        <a href='#'>View Details</a>
                      </p>
                      <h6>Integer velit mi facilisis</h6>
                    </article>
                  </li>
                </ul>
                {/* ################################################################################################ */}
                <div className='clear' />
              </section>
            </div>
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            <div
              className='wrapper row4 bgded overlay'
              style={{
                backgroundImage: `url("images/demo/backgrounds/04.png")`
              }}
            >
              <footer id='footer' className='hoc clear'>
                {/* ################################################################################################ */}
                <div className='one_third first'>
                  <h6 className='heading'>Gomag</h6>
                  <p>
                    Et posuere sit amet vulputate tempor tellus maecenas
                    vehicula magna quis pede curabitur iaculis dui eu purus
                    quisque est enim lobortis.
                  </p>
                  <p className='btmspace-50'>
                    Sed sollicitudin a mi vestibulum nisi ut lectus duis quam
                    leo consectetuer.
                  </p>
                  <nav>
                    <ul className='nospace'>
                      <li>
                        <a href='index.html'>
                          <i className='fa fa-lg fa-home' />
                        </a>
                      </li>
                      <li>
                        <a href='#'>About</a>
                      </li>
                      <li>
                        <a href='#'>Contact</a>
                      </li>
                      <li>
                        <a href='#'>Terms</a>
                      </li>
                      <li>
                        <a href='#'>Privacy</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className='one_third'>
                  <h6 className='heading'>
                    {intl.formatMessage({ id: 'contact.info' })}
                  </h6>
                  <ul className='nospace btmspace-30 linklist contact'>
                    <li>
                      <i className='fa fa-facebook-square' />
                      <address>Coin Challenges</address>
                    </li>
                    <li>
                      <i className='fa fa-envelope-o' />{' '}
                      coin.challenge@gmail.com
                    </li>
                  </ul>
                  <ul className='faico clear'>
                    <li>
                      <a className='faicon-facebook' href='#'>
                        <i className='fa fa-facebook' />
                      </a>
                    </li>
                    <li>
                      <a className='faicon-twitter' href='#'>
                        <i className='fa fa-twitter' />
                      </a>
                    </li>
                    <li>
                      <a className='faicon-dribble' href='#'>
                        <i className='fa fa-dribbble' />
                      </a>
                    </li>
                    <li>
                      <a className='faicon-linkedin' href='#'>
                        <i className='fa fa-linkedin' />
                      </a>
                    </li>
                    <li>
                      <a className='faicon-google-plus' href='#'>
                        <i className='fa fa-google-plus' />
                      </a>
                    </li>
                    <li>
                      <a className='faicon-vk' href='#'>
                        <i className='fa fa-vk' />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='one_third'>
                  <h6 className='heading'>Non lacus vivamus quis</h6>
                  <article>
                    <a href='#'>
                      <img
                        className='btmspace-15'
                        src={`${imageDir}/320x140.png`}
                        alt=''
                      />
                    </a>
                    <h6 className='nospace font-x1'>
                      <a href='#'>Sed congue vel gravida</a>
                    </h6>
                    <time
                      className='font-xs block btmspace-10'
                      dateTime='2045-04-05'
                    >
                      Thursday, 5<sup>th</sup> April 2045
                    </time>
                    <p className='nospace'>
                      Viverra interdum quam in hac habitasse platea dictumst sed
                      pede volutpat […]
                    </p>
                  </article>
                </div>
                {/* ################################################################################################ */}
              </footer>
            </div>
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            <div className='wrapper row5'>
              <div id='copyright' className='hoc clear'>
                {/* ################################################################################################ */}
                <p className='fl_left'>
                  Copyright © 2019 - All Rights Reserved -{' '}
                  <a href='#'>coin.walk.com</a>
                </p>
                <p className='fl_right'>
                  Template by{' '}
                  <a
                    target='_blank'
                    href='http://www.os-templates.com/'
                    title='Free Website Templates'
                  >
                    OS Templates
                  </a>
                </p>
                {/* ################################################################################################ */}
              </div>
            </div>
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            {/* ################################################################################################ */}
            <a id='backtotop' href='#top'>
              <i className='fa fa-chevron-up' />
            </a>
          </React.Fragment>
        ) : null}
      </LandingCtr>
    )
  }
}

export default injectIntl(Landing)
