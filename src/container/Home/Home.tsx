import React from 'react'
import { CommonStateType } from '@Reducers/commonReducer'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { initContract, setPopup } from '@Epics/commonEpic/action'
import Header from '@Components/Header'
import styled from 'styled-components'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { injectIntl, InjectedIntlProps } from 'react-intl'

const StyledParticle = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

const mapStateToProps = (state: Map<string, object>) => {
  return {
    data: state.get('common') as CommonStateType
  }
}

const mapDispatchToProps = (dispath: Dispatch) => ({
  initContract: () => dispath(initContract()),
  closePopup: () => dispath(setPopup({ showPop: false }))
})

interface Props {
  data: CommonStateType
  initContract: () => void
  closePopup: () => void
}

class Home extends React.Component<Props & InjectedIntlProps> {
  public async componentDidMount() {
    this.props.initContract()
    if (process.browser) {
      require('particles.js')
      window.particlesJS.load('particle-body', '/particlesjs-config.json')
    }
  }

  render() {
    const { data, intl, closePopup } = this.props
    const [popMessage, messageKey] = [
      data.get('popMessage'),
      data.get('messageKey')
    ]

    return (
      <React.Fragment>
        <StyledParticle id='particle-body' />
        <Header title='CoinChallenges' />
        <Dialog
          open={data.get('showPop')}
          keepMounted
          onClose={closePopup}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          {/* <DialogTitle id='alert-dialog-slide-title'>
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent style={{ wordBreak: 'break-all' }}>
            <DialogContentText id='alert-dialog-slide-description'>
              {messageKey ? intl.formatMessage({ id: messageKey }) : popMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closePopup} color='primary'>
              {intl.formatMessage({ id: 'ok' })}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Home))
