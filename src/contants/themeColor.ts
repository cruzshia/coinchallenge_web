const {
  REACT_APP_THEME,
  REACT_APP_SUB_THEME,
  REACT_APP_FONT_COLOR,
  REACT_APP_THEME_BACKGROUND
} = process.env
export const APP_THEME = REACT_APP_THEME || '#fe6b8b'
export const APP_SUB_THEME = REACT_APP_SUB_THEME || '#ff8e53'
export const APP_FONT_COLOR = REACT_APP_FONT_COLOR || '#ffffff'
export const APP_THEME_BACKGROUND =
  REACT_APP_THEME_BACKGROUND ||
  `linear-gradient(45deg, ${APP_THEME} 30%, ${APP_SUB_THEME} 90%)`
