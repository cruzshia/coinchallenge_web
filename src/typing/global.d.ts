declare let web3: any
declare const REACT_APP_THEME: string
declare module 'react-liquid-gauge'
declare module 'node-window-polyfill'
declare module 'react-d3-components'

interface Window {
  [key: string]: any
}
declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
}
