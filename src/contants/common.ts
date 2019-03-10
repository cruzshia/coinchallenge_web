export const breakPoint = '800px'
export const supportLang = ['en_US', 'zh_TW', 'zh_CN']
export const hostUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://coinchallenges.app/'
  }
  return 'https://coin-challenges.herokuapp.com/'
}
