import React, { ComponentType, PureComponent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import AppBar, { AppBarProps } from '@material-ui/core/AppBar'
import { APP_THEME, APP_FONT_COLOR } from '@Src/contants/themeColor'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Language from '@material-ui/icons/Language'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  left: 0,
  top: 0,
  background: APP_THEME,
  textAlign: 'center',
  lineHeight: '50px',
  color: APP_FONT_COLOR
}) as ComponentType<AppBarProps>

const LangIcon = styled(Language)({
  position: 'absolute',
  top: 15,
  right: 10
}) as ComponentType<SvgIconProps>

interface BarProp extends RouteComponentProps {
  title: string
}

interface BarState {
  anchorEl: null | EventTarget
}

class ButtonAppBar extends PureComponent<BarProp, BarState> {
  public state = {
    anchorEl: null
  }

  private handeClick = (e: React.MouseEvent) => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <StyledAppBar>
        <h1>
          {this.props.title}
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
            <MenuItem onClick={this.handleClose}>繁體中文</MenuItem>
            <MenuItem onClick={this.handleClose}>簡體中文</MenuItem>
            <MenuItem onClick={this.handleClose}>English</MenuItem>
          </Menu>
        </div>
      </StyledAppBar>
    )
  }
}

export default withRouter(ButtonAppBar)
