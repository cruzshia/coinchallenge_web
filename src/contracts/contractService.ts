import Contract from 'web3/eth/contract'
//process.env.REACT_APP_CONTRACT_ADDRESS
const STATUS = {
  Succeeded: 0,
  Failed: 1,
  Aborted: 2
}

interface GetChallengeProp {
  contract: Contract
  challenger: string
}

export const getAllChallenges = async ({
  contract,
  challenger
}: GetChallengeProp) => {
  await contract.events.NewChallenge(
    {
      filter: { proposer: challenger },
      fromBlock: 0
      // to: 'latest'
    },
    function(_error: any, event: any) {
      console.log('event,', event)
    }
  )
}

export const getFinishChallenges = async ({
  contract,
  challenger
}: GetChallengeProp) => {
  await contract.events.FinishChallenge(
    {
      filter: { who: challenger, status: STATUS.Succeeded },
      fromBlock: 0
      // to: 'latest'
    },
    function(_error: any, event: any) {
      console.log('event,', event)
    }
  )
}

export const getNewChallengeGroup = async (contract: Contract) => {
  await contract.events.NewChallengeGroup(
    {
      fromBlock: 0
    },
    function(_error: any, event: any) {
      console.log('event,', event)
    }
  )
}

// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })

// await MyContract.events.NewChallengeGroup(
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )

// await MyContract.events.NewChallenge(
//   {proposer: challenger},
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )

// await MyContract.events.FinishChallenge(
//   {who: challenger, status: 0},
//   {
//     fromBlock: 0,
//     to: 'latest'
//   },
//   function(error: any, event: any) {
//     console.log('event,', event)
//   }
// )
