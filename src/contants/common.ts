import { ChainType } from '@Src/typing/globalTypes'

export const breakPoint = '800px'
export const supportLang = ['en', 'zh-TW', 'zh-CN']
export const hostUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://coinchallenges.app/'
  }
  return 'https://coin-challenges.herokuapp.com/'
}

export const APP_COIN = (chain?: ChainType) =>
  chain && chain === 'dexon' ? 'DXN' : 'ETH'
