import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

interface TransactionProp {
  txHash?: string
  classNames?: string
}

function Transaction({ txHash, classNames }: TransactionProp) {
  return (
    <React.Fragment>
      {txHash ? (
        <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target='_blank'>
          Transaction is waiting for confirmation
        </a>
      ) : null}

      <LinearProgress color='secondary' className={classNames} />
    </React.Fragment>
  )
}

export default Transaction
