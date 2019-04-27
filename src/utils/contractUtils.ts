import Web3 from 'web3'
import CoinChallengs from '@Src/contracts/CoinChallenges.json'
import { ChallengeType } from '@Src/typing/globalTypes'
import { isDexon } from '@Src/utils'

let networkAddress =
  'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
let contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111'

const isProd = process.env.REACT_APP_NETWORK === 'PROD'

export const newContract = (web3Interface: Web3, address?: string) => {
  let newContract = null
  try {
    newContract = new web3Interface.eth.Contract(
      CoinChallengs.abi,
      address || contractAddress
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
  chain = chain || 'ethereum'
  if (!web3) {
    if (isProd) {
      netId = isDexon(chain) ? 237 : 1
    } else {
      netId = isDexon(chain) ? 238 : 3
    }
  } else {
    netId = await web3.eth.net.getId()
  }

  switch (netId) {
    case 1: //main net
      networkAddress =
        'wss://mainnet.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
      CHAIN_ADDRESS[chain]('PROD')
      break
    case 3: //ropsten
      networkAddress =
        'wss://ropsten.infura.io/ws/v3/9d6ecc41833d434a921bf5de878f834f'
      CHAIN_ADDRESS[chain]('TEST')
      break
    case 237: //'DEXON main Network'
      networkAddress = 'wss://mainnet-rpc.dexon.org/ws'
      CHAIN_ADDRESS[chain]('PROD')
      break
    case 238: //'DEXON Test Network'
      networkAddress = 'wss://testnet-rpc.dexon.org/ws'
      CHAIN_ADDRESS[chain]('TEST')
      break
    default:
      networkAddress = 'ws://localhost:7545'
      CHAIN_ADDRESS[chain]('LOCAL')
  }
  return networkAddress
}

const getContract = (env: 'PROD' | 'TEST' | 'LOCAL') => {
  switch (env) {
    case 'PROD':
      contractAddress = '0xf7eAF1eFdC121B00dba59e07e87616170a6e7bEC'
      break
    case 'TEST':
      contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111'
      break
    default:
      contractAddress = '0x26965fB7d9F93CA5D45042C3a0364932f9B1a111'
  }
}

const getDexonContract = (env: 'PROD' | 'TEST' | 'LOCAL') => {
  switch (env) {
    case 'PROD':
      contractAddress = '0xE021C75841a07801d06bA714C51b79C651e0a390'
      break
    case 'TEST':
      contractAddress = '0x0fc4f5c56299FF58019623c3d7daF6D1c78d7d57'
      break
    default:
      contractAddress = '0x0fc4f5c56299FF58019623c3d7daF6D1c78d7d57'
  }
}

const CHAIN_ADDRESS = {
  ethereum: getContract,
  dexon: getDexonContract
}
