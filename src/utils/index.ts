import { detect } from 'detect-browser'
import { Decimal } from 'decimal.js'
import { matchPath } from 'react-router-dom'
import { supportLang } from '@Src/contants/common'

const browser = detect()

export const getMetmaskUrl = () => {
  switch (browser && browser.name) {
    case 'chrome':
      return 'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
    case 'firefox':
      return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
    case 'opera':
      return 'https://addons.opera.com/en/extensions/details/metamask/'
    default:
      return null
  }
}

export const formatPercent = (a: number, b: number) => {
  if (b === 0) {
    return '0.0'
  }
  return new Decimal((a * 100) / b).toPrecision(2)
}

export const isUrlValid = (url: string) => {
  return url.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  )
}

export const formatNumber = (val: number) => {
  val = val || 0
  return new Decimal(val).toPrecision(5)
}

interface MatchParam {
  params: {
    lng: string
  }
}

export const matchPathFunc = (pathname: string) =>
  matchPath(pathname, {
    path: '/:lng/**/',
    strict: false
  }) as MatchParam

export const parseLangPath = (pathname: string): string => {
  const match = matchPathFunc(pathname)

  let { lng } = match ? match.params : { lng: '' }

  if (!lng || lng === '') {
    lng = require('browser-locale')()
    lng = lng.indexOf('en') > -1 ? 'en' : lng
    let splitLng = lng ? lng.split(/-|_/) : ['en']
    lng =
      splitLng.length > 1
        ? `${splitLng[0]}-${splitLng[1].toUpperCase()}`
        : splitLng[0]
  }

  if (!match || supportLang.indexOf(lng) < 0) {
    return 'en'
  }

  return lng
}
