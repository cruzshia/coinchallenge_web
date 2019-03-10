export const breakPoint = '800px'
export const supportLang = ['en', 'zh-TW', 'zh-CN']
export const hostUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://coinchallenges.app/'
  }
  return 'https://coin-challenges.herokuapp.com/'
}
