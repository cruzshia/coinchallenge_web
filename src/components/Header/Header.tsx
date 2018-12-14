import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles({
  topBar: {
    background: process.env.REACT_APP_THEME,
    textAlign: 'center',
    lineHeight: '50px'
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
