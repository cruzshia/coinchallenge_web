import styled from 'styled-components'
import { APP_THEME, APP_SUB_THEME } from '@Src/contants/themeColor'

export const GradientFont = function(domTag: any) {
  return styled(domTag)({
    color: APP_THEME,
    background: `-webkit-linear-gradient(${APP_THEME}, ${APP_SUB_THEME})`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  })
}

export const GradientFontBlue = function(domTag: any) {
  return styled(domTag)({
    color: APP_THEME,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  })
}
