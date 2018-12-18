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
