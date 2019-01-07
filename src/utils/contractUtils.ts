import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { TimeInterval } from 'rxjs/internal/operators/timeInterval'

let networkAddress = 'ws://localhost:7545'
let contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c'
let hasChecker = false

export const newContract = (web3Interface: Web3) => {
  let newContract = null
  try {
    newContract = new web3Interface.eth.Contract(
      CoinChallengs.abi,
      contractAddress,
      {
        gas: 4600000
      }
    )
  } catch (err) {
    console.log(err)
  }
  return newContract
}

export const detectNetwork = async (web3: Web3 | null) => {
  let netId = 0
  if (!web3) {
    netId =
      typeof location !== undefined && location.host.indexOf('localhost') > -1
        ? 0
        : 3
  } else {
    netId = await web3.eth.net.getId()
  }

  switch (netId) {
    case 1: //main net
      break
    case 3: //ropsten
      networkAddress =
        'wss://ropsten.infura.io/ws/v3/8bf4cd050c0f4dcebfba65a2ceab3fe0'
      contractAddress = '0xb461bac31fb00204baacf820efa19373e4b580d2'
      break
    default:
      networkAddress = 'ws://localhost:7545'
      contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c'
  }
  return networkAddress
}
