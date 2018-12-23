// Express requirements
import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
// import Loadable from 'react-loadable';
// import cookieParser from 'cookie-parser';
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import { StaticRouter } from 'react-router'
import App from '../dist/components/App/index.js'
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux'
import store from '../dist/store'

let filePath = path.resolve(__dirname, '../build', 'index.html')
let index = fs.readFileSync(filePath, 'utf8')

// Our loader - this basically acts as the entry point for each page load

const app = express()
const PORT = process.env.PORT || 4000

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
// app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('**', function(req, res) {
  const sheet = new ServerStyleSheet()
  const html = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter context={{}} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    )
  )
  const styleTags = sheet.getStyleTags()
  index = index.replace('</head>', `${styleTags}</head>`)
  res.send(
    index.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  )
})

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
// Loadable.preloadAll().then(() => {
//   app.listen(PORT, console.log(`App listening on port ${PORT}!`));
// });

app.listen(PORT, console.log(`App listening on port ${PORT}!`))

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
