import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'

import messageEn from './en.json'
import messageZH_TW from './zh_TW.json'
import messageZH_CN from './zh_CN.json'

import { RouteComponentProps } from 'react-router-dom'
import { supportLang } from '@Src/contants/common'
import { parseLangPath } from '@Utils/index'

addLocaleData([...localeEn, ...localeZh])

type Message = {
  en: string
  zh_TW: string
  zh_CN: string
}

type MessagesProp = { [k in keyof Message]: any }

const messgaes = {
  en: messageEn,
  zh_TW: messageZH_TW,
  zh_CN: messageZH_CN
} as MessagesProp

function extractLang(pathname: string) {
  const match = parseLangPath(pathname)
  if (!match || supportLang.indexOf(match.params.lng) < 0) {
    return 'en'
  }
  return match && supportLang.indexOf(match.params.lng) > -1
    ? match.params.lng
    : null
}

export default function(WrappedComponent: React.ComponentClass) {
  return class MutilLang extends React.Component<RouteComponentProps> {
    public state = {
      lang: extractLang(this.props.location.pathname) || 'en'
    }

    public componentDidMount() {
      const { history } = this.props
      history.listen(location => {
        const nextLang = extractLang(location.pathname)
        if (nextLang && nextLang !== this.state.lang) {
          this.setState({
            lang: nextLang
          })
        }
      })
    }

    public render() {
      const { lang } = this.state
      return (
        <IntlProvider locale={lang} messages={messgaes[lang]}>
          <WrappedComponent />
        </IntlProvider>
      )
    }
  }
}
