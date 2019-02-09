import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Helmet from 'react-helmet'
import fs from 'fs'
import App from '../dist/components/App/index.js'
import { APP_THEME } from '../dist/contants/themeColor.js'
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux'
import { SheetsRegistry } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles'
import store from '../dist/store'
import Web3 from 'web3'
import {
  setChallenge,
  setChallengeGroup
} from '../dist/epics/challengeEpic/action'
import { newContract } from '../dist/utils/contractUtils'
import {
  getChallenge,
  getChallengeGroup
} from '../dist/contracts/contractService'

let filePath = path.resolve(__dirname, '../build', 'index.html')
let index = fs.readFileSync(filePath, 'utf8')

// Our loader - this basically acts as the entry point for each page load

const app = express()
const PORT = process.env.PORT || 4000

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('/challenge/:groupId/:address', async (req, res) => {
  const { groupId, address } = req.params
  const providers = new Web3().providers
  const web3 = new Web3(
    new providers.WebsocketProvider(
      'wss://ropsten.infura.io/ws/v3/8bf4cd050c0f4dcebfba65a2ceab3fe0'
    )
  )
  const contract = newContract(
    web3,
    '0x0884104630fF102C5c83a4DA450139e8B300098C'
  )
  let challengeRes
  try {
    challengeRes = await getChallenge({
      contract,
      groupId,
      challenger: address
    })
    store.dispatch(setChallenge(challengeRes))
  } catch (err) {
    console.log('ssr get challenge error')
    console.log(err)
  }

  try {
    const { name, url } = await getChallengeGroup({
      contract,
      groupId,
      challenger: address
    })
    store.dispatch(setChallengeGroup({ groupImage: url, groupName: name }))
  } catch (err) {
    console.log('ssr get challenge group error')
    console.log(err)
  }

  const html = getRenderedHtml(req.url)
  const preloadedState = store.getState().toJS()

  res.send(
    html.replace(
      '<body>',
      `<body>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>`
    )
  )
})

app.get('**', function(req, res) {
  res.send(getRenderedHtml(req.url))
})

const getRenderedHtml = url => {
  const sheet = new ServerStyleSheet()

  const sheetsRegistry = new SheetsRegistry()
  // Create a sheetsManager instance.
  const sheetsManager = new Map()
  const generateClassName = createGenerateClassName()
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: APP_THEME
      },
      type: 'light'
    }
  })

  const html = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter context={{}} location={url}>
          <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
          >
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>
    )
  )
  const styleTags = sheet.getStyleTags()
  const css = sheetsRegistry.toString()
  const helmet = Helmet.renderStatic()

  index = index.replace(/<title>.*<\/title>/, helmet.title.toString())

  index = index.replace(
    '</head>',
    `${styleTags}
      <style id='jss-ssr'>${css}</style>
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>`
  )

  return index.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

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
