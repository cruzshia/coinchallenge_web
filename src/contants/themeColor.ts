const {
  REACT_APP_THEME,
  REACT_APP_SUB_THEME,
  REACT_APP_FONT_COLOR,
  REACT_APP_THEME_BACKGROUND
} = process.env
export const APP_THEME = REACT_APP_THEME || '#ff5864'
export const APP_SUB_THEME = REACT_APP_SUB_THEME || '#ff99a0'
export const APP_FONT_COLOR = REACT_APP_FONT_COLOR || '#ffffff'
export const APP_THEME_BACKGROUND =
  REACT_APP_THEME_BACKGROUND ||
  `linear-gradient(45deg, ${APP_THEME} 30%, ${APP_SUB_THEME} 90%)`

export const COLOR_BAR = [
  '#ff6776',
  'rgba(0, 118, 216, 0.6)',
  'rgba(0, 163, 56, 0.6)'
]
