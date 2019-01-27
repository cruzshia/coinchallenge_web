import React, { ComponentType, PureComponent } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import AppBar, { AppBarProps } from '@material-ui/core/AppBar'
import { APP_THEME, APP_FONT_COLOR } from '@Src/contants/themeColor'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Language from '@material-ui/icons/Language'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { supportLang, breakPoint } from '@Src/contants/common'

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

interface BarProp extends RouteComponentProps {
  title: string
}

interface BarState {
  anchorEl: null | EventTarget
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

  private onSelectLang = (lang: string) => () => {
    const { history } = this.props

    history.replace(`${history.location.pathname}?l=${lang}`)
    this.handleClose()
  }

  public render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <StyledAppBar id='project-header'>
        <h1>
          <Link to='/'>{this.props.title}</Link>
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
      </StyledAppBar>
    )
  }
}

export default withRouter(ButtonAppBar)
