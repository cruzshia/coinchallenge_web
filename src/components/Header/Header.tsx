import React, { ComponentType, PureComponent } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import AppBar, { AppBarProps } from '@material-ui/core/AppBar'
import { APP_THEME, APP_FONT_COLOR } from '@Src/contants/themeColor'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Language from '@material-ui/icons/Language'
import MonetizationOn from '@material-ui/icons/MonetizationOn'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { supportLang } from '@Src/contants/common'
import { connect } from 'react-redux'
import { CommonStateType } from '@Reducers/commonReducer'
import { breakPoint } from '@Src/contants/common'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { Dispatch } from 'redux'
import { withdrawBalance } from '@Epics/commonEpic/action'

const StyledAppBar = styled(AppBar)({
  width: '100vw',
  position: 'fixed',
  left: 0,
  top: 0,
  background: APP_THEME,
  textAlign: 'center',
  lineHeight: '50px',
  color: APP_FONT_COLOR,
  a: {
    color: APP_FONT_COLOR,
    textDecoration: 'none'
  }
}) as ComponentType<AppBarProps>

const LangIcon = styled(Language)({
  position: 'absolute',
  top: 15,
  right: 10
}) as ComponentType<SvgIconProps>

const MonetizationOnIcon = styled(MonetizationOn)({
  position: 'absolute',
  top: 15,
  right: 42,
  cursor: 'pointer'
}) as ComponentType<SvgIconProps>

const Balance = styled('div')({
  position: 'absolute',
  top: 2,
  right: 70,
  color: '#fff',
  fontSize: '14px',
  [`@media (max-width: ${breakPoint})`]: {
    display: 'none'
  }
})

interface BarProp extends RouteComponentProps, InjectedIntlProps {
  title: string
  balance: string
  withdrawBalance: () => void
}

interface BarState {
  anchorEl: null | EventTarget
  openWithdraw: boolean
}

const LangMenu = [
  {
    value: supportLang[0],
    title: 'English'
  },
  {
    value: supportLang[1],
    title: '繁體中文'
  },
  {
    value: supportLang[2],
    title: '简体中文'
  }
]

const { REACT_APP_COIN = 'ETH' } = process.env
class ButtonAppBar extends PureComponent<BarProp, BarState> {
  public state = {
    anchorEl: null,
    openWithdraw: false
  }

  private onOpenWithdraw = () => {
    this.setState({
      openWithdraw: true
    })
  }

  private onCloseWithraw = () => {
    this.setState({
      openWithdraw: false
    })
  }

  private onWithdraw = () => {
    this.props.withdrawBalance()
    this.setState({
      openWithdraw: false
    })
  }

  private handeClick = (e: React.MouseEvent) => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }

  private onSelectLang = (lang: string) => () => {
    const { history } = this.props

    history.replace(`${history.location.pathname}?l=${lang}`)
    this.handleClose()
  }

  public render() {
    const { anchorEl } = this.state
    const { balance, intl } = this.props

    const open = Boolean(anchorEl)
    return (
      <StyledAppBar id='project-header'>
        <h1>
          <Link to='/'>{this.props.title}</Link>
          {Number(balance) > 0 ? (
            <React.Fragment>
              <Balance>
                {Number(Number(balance).toFixed(8))} {REACT_APP_COIN}
              </Balance>
              <MonetizationOnIcon onClick={this.onOpenWithdraw} />
            </React.Fragment>
          ) : null}

          <LangIcon onClick={this.handeClick} />
        </h1>
        <div style={{ position: 'relative' }}>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Fade}
          >
            {LangMenu.map(item => (
              <MenuItem
                key={item.value}
                onClick={this.onSelectLang(item.value)}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Dialog
          open={this.state.openWithdraw}
          onClose={this.onCloseWithraw}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {intl.formatMessage({ id: 'withdraw' })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {intl.formatMessage(
                { id: 'withdraw.confirm.desc' },
                {
                  balance: `${balance} ${REACT_APP_COIN}`
                }
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseWithraw} color='primary'>
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button onClick={this.onWithdraw} color='primary' autoFocus>
              {intl.formatMessage({ id: 'confirm' })}
            </Button>
          </DialogActions>
        </Dialog>
      </StyledAppBar>
    )
  }
}

const mapStateToProps = (state: Map<string, object>) => {
  const commonState = state.get('common') as CommonStateType
  return {
    balance: commonState.get('accountBalance')
  }
}

const mapDispathToProps = (dispatch: Dispatch) => ({
  withdrawBalance: () => dispatch(withdrawBalance())
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withRouter(injectIntl(ButtonAppBar)))
