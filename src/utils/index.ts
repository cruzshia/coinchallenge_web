import { detect } from 'detect-browser'
import { Decimal } from 'decimal.js'
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
