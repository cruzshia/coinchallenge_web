import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import localeEn from 'react-intl/locale-data/en'
import localeZh from 'react-intl/locale-data/zh'

import messageEn from './en.json'
import messageZh from './zh_TW.json'

addLocaleData([...localeEn, ...localeZh])

type Message = {
  en: string
  zh: string
}

type MessagesProp = { [k in keyof Message]: any }

const messgaes = {
  en: messageEn,
  zh: messageZh
} as MessagesProp

export default function(WrappedComponent: React.ComponentClass) {
  return class MutilLang extends React.Component {
    state = {
      lang: 'en'
    }

    render() {
      const { lang } = this.state
      return (
        <IntlProvider locale={lang} messages={messgaes[lang]}>
          <WrappedComponent />
        </IntlProvider>
      )
    }
  }
}
