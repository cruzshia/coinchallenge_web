import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { ChallengeType } from '@Src/typing/globalTypes'

let networkAddress =
  'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
let contractAddress = '0x093240763E9227B30DA751A743B52c0aADC7E945'

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
    round: Number(response._currentRound),
    targetDays: Number(response._targetDays),
    totalDays: Number(response._totalDays),
    completeDays: Number(response._completeDays),
    startTimestamp: Number(response._startTimestamp) * 1000,
    sponserSize: Number(response._sponsorSize),
    amount: Number(Web3.utils.fromWei(response._amount)),
    totalSponsorAmount: Number(
      Web3.utils.fromWei(response._totalSponsorAmount)
    ),
    goal: response._goal
  }

  return challenge
}

export const detectNetwork = async (web3: Web3 | null, chain?: string) => {
  let netId = 0
  if (!web3) {
    netId = chain === 'dexon' ? 238 : 3
  } else {
    netId = await web3.eth.net.getId()
  }

  switch (netId) {
    case 1: //main net
      networkAddress =
        'wss://mainnet.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
      contractAddress = '0xeEe43e9258D59F118F700aae73a91765A0BD2bcC'
      break
    case 3: //ropsten
      networkAddress =
        'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
      contractAddress = '0x093240763E9227B30DA751A743B52c0aADC7E945'
      break
    case 238: //'DEXON Test Network'
      networkAddress = 'wss://testnet-rpc.dexon.org/ws'
      contractAddress = '0xF1A996ddb41a2BEFA1459EF0482421f3F2295682'
      break
    default:
      networkAddress = 'ws://localhost:7545'
      contractAddress = '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c'
  }
  return networkAddress
}
