import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { ChallengeType } from '@Src/typing/globalTypes'

let networkAddress = 'ws://localhost:7545'
let contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c'

export const newContract = (web3Interface: Web3, address?: string) => {
  let newContract = null
  try {
    newContract = new web3Interface.eth.Contract(
      CoinChallengs.abi,
      address || contractAddress,
      {
        gas: 6000000
      }
    )
  } catch (err) {
    console.log(err)
  }
  return newContract
}

export const parseChallenge = (response: any): ChallengeType => {
  const challenge = {
    targetDays: Number(response._targetDays),
    totalDays: Number(response._totalDays),
    completeDays: Number(response._completeDays),
    startDayTimestamp: Number(response._startDayTimestamp) * 1000 * 86400,
    sponserSize: Number(response._sponsorSize),
    amount: Number(Web3.utils.fromWei(response._amount))
  }

  return challenge
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
      contractAddress = '0x353acf73C7c2e7E07D666cC1c615fcbdAc62f7D8'
      break
    default:
      networkAddress = 'ws://localhost:7545'
      contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c'
  }
  return networkAddress
}
