import React, { ReactNode } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'

interface MessageProp {
  key: number
  message: ReactNode
}

interface NotifierState {
  open: boolean
  messageInfo: MessageProp | {}
}

const StyledTxt = styled('span')({
  color: '#e10050'
})

class Notifier extends React.Component<{}, NotifierState> {
  private queue: Array<MessageProp> = []

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

  public componentDidMount() {
    setInterval(() => {
      this.queue.push({
        key: Math.random(),
        message: (
          <span>
            {Math.random()} has created a {<StyledTxt>walk</StyledTxt>}{' '}
            challenge
          </span>
        )
      })
      this.processQueue()
    }, 3000)
  }

  public render() {
    const { messageInfo } = this.state

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
          'aria-describedby': 'message-id'
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

export default Notifier
