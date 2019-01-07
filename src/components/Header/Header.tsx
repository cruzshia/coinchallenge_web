import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { APP_THEME, APP_FONT_COLOR } from '@Src/contants/themeColor'
import { withStyles } from '@material-ui/core/styles'
import Language from '@material-ui/icons/Language'

const StyledAppBar = withStyles({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    background: APP_THEME,
    textAlign: 'center',
    lineHeight: '50px',
    color: APP_FONT_COLOR
  }
})(AppBar)

function ButtonAppBar({ title }: { title: string }) {
  return (
    <StyledAppBar position='static'>
      <h1>{title}</h1>
      <Language />
    </StyledAppBar>
  )
}

export default ButtonAppBar
