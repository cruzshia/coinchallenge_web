import React from 'react'
import Loading from '@Src/images/blocking.gif'
import styled from 'styled-components'
import { injectIntl, InjectedIntlProps } from 'react-intl'

interface TransactionProp extends InjectedIntlProps {
  txHash?: string
  classNames?: string
}

const Div = styled('div')({
  position: 'relative',
  fontSize: 12
})

const Img = styled('img')({
  width: '100px',
  display: 'block',
  margin: '0 auto'
})

const Href = styled('a')({
  position: 'absolute',
  transform: 'translateX(-50%)',
  left: '50%',
  bottom: 0
})

function Transaction({ txHash, classNames, intl }: TransactionProp) {
  return (
    <Div>
      {txHash ? (
        <Href
          href={`https://ropsten.etherscan.io/tx/${txHash}`}
          target='_blank'
        >
          {intl.formatMessage({ id: 'waitConfirm' })}
        </Href>
      ) : null}

      <Img src={Loading} className={classNames} />
    </Div>
  )
}

export default injectIntl(Transaction)
