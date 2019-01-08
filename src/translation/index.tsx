import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'

import messageEN_US from './en.json'
import messageZH_TW from './zh_TW.json'
import messageZH_CN from './zh_CN.json'

import { RouteComponentProps } from 'react-router-dom'
import { parseLangPath } from '@Utils/index'

addLocaleData([...localeEn, ...localeZh])

type Message = {
  en_US: string
  zh_TW: string
  zh_CN: string
}

type MessagesProp = { [k in keyof Message]: any }

const messgaes = {
  en_US: messageEN_US,
  zh_TW: messageZH_TW,
  zh_CN: messageZH_CN
} as MessagesProp

export default function(WrappedComponent: React.ComponentClass) {
  return class MutilLang extends React.Component<RouteComponentProps> {
    public state = {
      lang: parseLangPath(this.props.location.pathname)
    }

    public componentDidMount() {
      const { history } = this.props
      history.listen(location => {
        const nextLang = parseLangPath(location.pathname)
        if (nextLang && nextLang !== this.state.lang) {
          this.setState({
            lang: nextLang
          })
        }
      })
    }

    public render() {
      const { lang } = this.state
      const locale = lang.indexOf('en') > -1 ? 'en' : 'zh'
      return (
        <IntlProvider locale={locale} messages={messgaes[lang]}>
          <WrappedComponent />
        </IntlProvider>
      )
    }
  }
}
