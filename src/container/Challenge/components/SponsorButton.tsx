import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'
import { InjectedIntl } from 'react-intl'

const FabCtr = styled('span')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 6
})

interface SponsorButtonState {
  open: boolean
  amountError: boolean
  commentError: boolean
}

interface SponsorButtonProp {
  onSponsor: Function
  intl: InjectedIntl
}

const { REACT_APP_COIN } = process.env

class SponsorButton extends React.PureComponent<
  SponsorButtonProp,
  SponsorButtonState
> {
  private amountRef: React.RefObject<any> = React.createRef()
  private commentRef: React.RefObject<any> = React.createRef()

  public state = {
    open: false,
    amountError: false,
    commentError: false
  }

  private onConfirm = () => {
    const amount = Number(this.amountRef.current.value)
    const comment = this.commentRef.current.value.trim()
    const amountError = amount <= 0
    const commentError = comment === ''
    if (amountError || commentError) {
      this.setState({
        amountError,
        commentError
      })
      return
    }
    this.props.onSponsor({
      amount,
      comment
    })
    this.handleClose()
  }

  private handleClose = () => {
    this.setState({
      open: false
    })
  }

  private handleOpen = () => {
    this.setState({
      open: true
    })
  }

  public render() {
    const { intl } = this.props
    return (
      <React.Fragment>
        <FabCtr onClick={this.handleOpen}>
          <Fab variant='extended' color='primary' aria-label='Delete'>
            <NavigationIcon />
            {intl.formatMessage({ id: 'sponsor' })}
          </Fab>
        </FabCtr>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {intl.formatMessage({ id: 'sponsor' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {intl.formatMessage({ id: 'sponsorDesc' })}
            </DialogContentText>
            <TextField
              error={this.state.amountError}
              required
              margin='dense'
              id='amount'
              label={`${intl.formatMessage({
                id: 'amount'
              })} (${REACT_APP_COIN})`}
              type='number'
              inputRef={this.amountRef}
              fullWidth
            />
            <TextField
              error={this.state.commentError}
              required
              margin='dense'
              id='comment'
              label={intl.formatMessage({ id: 'comment' })}
              type='text'
              inputRef={this.commentRef}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button onClick={this.onConfirm} color='primary'>
              {intl.formatMessage({ id: 'confirm' })}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default SponsorButton
