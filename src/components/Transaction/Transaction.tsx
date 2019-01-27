import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { injectIntl, InjectedIntlProps } from 'react-intl'

interface TransactionProp extends InjectedIntlProps {
  txHash?: string
  classNames?: string
}

function Transaction({ txHash, classNames, intl }: TransactionProp) {
  return (
    <React.Fragment>
      {txHash ? (
        <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target='_blank'>
          {intl.formatMessage({ id: 'waitConfirm' })}
        </a>
      ) : null}

      <LinearProgress color='secondary' className={classNames} />
    </React.Fragment>
  )
}

export default injectIntl(Transaction)
