import React, { ReactNode } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import Contract from 'web3/eth/contract'
import { newChallengesEvents } from '@Src/contracts/contractService'
import { ChallengeType } from '@Src/typing/globalTypes'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import web3 from 'web3'
interface MessageProp {
  key: number
  message: ReactNode
}

interface NotifierState {
  open: boolean
  messageInfo: MessageProp | {}
}

interface ChallengeEvent extends ChallengeType {
  proposer: string
}

const StyledTxt = styled('span')({
  color: '#e10050'
})

const style = {
  message: {
    maxWidth: '85%'
  }
}

const { REACT_APP_COIN } = process.env

class Notifier extends React.Component<
  { contract: Contract | null } & WithStyles,
  NotifierState
> {
  private queue: Array<MessageProp> = []
  private registered: boolean = false

  public state = {
    open: false,
    messageInfo: {
      key: Math.random(),
      message: ''
    }
  }

  private processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift() as MessageProp,
        open: true
      })
    }
  }

  private handleClose = () => {
    this.setState({ open: false })
  }

  private handleExited = () => {
    this.processQueue()
  }

  private insertEvent = (props: ChallengeEvent) => {
    const { proposer, amount } = props
    this.queue.push({
      key: Math.random(),
      message: (
        <span>
          {proposer} has created a challenge with{' '}
          <StyledTxt>{Number(web3.utils.fromWei(amount))}</StyledTxt>
          {REACT_APP_COIN}
        </span>
      )
    })
    this.processQueue()
  }

  public componentDidUpdate() {
    const { contract } = this.props
    if (contract && !this.registered) {
      this.registered = true
      newChallengesEvents({
        contract,
        callback: this.insertEvent
      })
    }
  }

  public render() {
    const { messageInfo } = this.state
    const { classes } = this.props

    return (
      <Snackbar
        key={messageInfo.key}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
          classes
        }}
        message={messageInfo.message}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }
}

export default withStyles(style)(Notifier)
