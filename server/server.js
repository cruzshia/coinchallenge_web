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

import { generateImage } from './imageService'

let filePath = path.resolve(__dirname, '../build', 'index.html')

const app = express()
const PORT = process.env.PORT || 4000

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(express.static(path.resolve(__dirname, '../build')))

let contract = null

const initContract = async () => {
  if (contract !== null) return
  const providers = new Web3().providers
  const web3 = new Web3(
    new providers.WebsocketProvider(
      'wss://ropsten.infura.io/ws/v3/8bf4cd050c0f4dcebfba65a2ceab3fe0'
    )
  )
  contract = newContract(web3, '0xADED855550796DDA123f13d236dFEA12aa102D0B')
}

initContract()

const fetchResChallenge = async ({ groupId, challenger, round }) => {
  await initContract()
  let challengeRes
  try {
    challengeRes = await getChallenge({
      contract,
      groupId,
      challenger,
      round
    })
  } catch (error) {
    throw 'fetch challenge error'
  }
  return challengeRes
}

const fetchGroup = async ({ groupId, challenger }) => {
  try {
    const group = await getChallengeGroup({
      contract,
      groupId
    })
    return group
  } catch (error) {
    throw 'fetch group error'
  }
}

// app.get('/api/share/:groupId/:address/(:round)?', async (req, res) => {
app.get('/share/:groupId/:address/:round*?', async (req, res) => {
  let { groupId, address, round } = req.params
  const { l } = req.query
  await initContract()
  let challengeRes
  let group
  try {
    challengeRes = await fetchResChallenge({
      groupId,
      challenger: address,
      round
    })

    group = await fetchGroup({
      groupId
    })
  } catch (error) {
    res.status(400).send({ error: 'error challenge data' })
    return
  }

  if (!group.minAmount || !challengeRes.totalDays) {
    res.status(400).send({ error: 'challenge not found' })
    return
  }

  let challengeData = {
    lng: l,
    groupId,
    groupName: group.name,
    round: challengeRes.round,
    totalDays: challengeRes.totalDays,
    challenger: address,
    goal: challengeRes.goal,
    amount: challengeRes.amount + ' ' + process.env.REACT_APP_COIN
  }

  generateImage({
    challengeData,
    isPreview: true,
    cbk: async data => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': data.length
      })
      res.end(data)
    },
    errorCbk: err => {
      console.log(err)
      res.status(911).send({ error: 'image create failed' })
    }
  })
})

app.get('/challenge/:groupId/:address/(:round)?', async (req, res) => {
  let { groupId, address, round } = req.params

  round = round && !isNaN(round) ? Number(round) : undefined

  let challengeRes = await fetchResChallenge({
    groupId,
    challenger: address,
    round
  })
  store.dispatch(setChallenge(challengeRes))

  const { name, url, minAmount } = await fetchGroup({
    groupId
  })
  store.dispatch(
    setChallengeGroup({ groupImage: url, groupName: name, minAmount })
  )

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: APP_THEME
    },
    type: 'light'
  }
})

const getRenderedHtml = url => {
  let index = fs.readFileSync(filePath, 'utf8')
  const sheet = new ServerStyleSheet()

  const sheetsRegistry = new SheetsRegistry()
  // Create a sheetsManager instance.
  const sheetsManager = new Map()
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false
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
