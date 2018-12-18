import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import { APP_THEME_BACKGROUND, APP_FONT_COLOR } from '@Src/contants/themeColor'

const useStyles = makeStyles({
  topBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    background: APP_THEME_BACKGROUND,
    textAlign: 'center',
    lineHeight: '50px',
    color: APP_FONT_COLOR
  }
})

function ButtonAppBar({ title }: { title: string }) {
  const classes = useStyles({})
  return (
    <AppBar position='static' className={classes.topBar}>
      <h1>{title}</h1>
    </AppBar>
  )
}

export default ButtonAppBar
