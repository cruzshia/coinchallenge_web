import Contract from 'web3/eth/contract'
import { Sponsor } from '@Src/typing/globalTypes'
//process.env.REACT_APP_CONTRACT_ADDRESS
const STATUS = {
  Succeeded: 0,
  Failed: 1,
  Aborted: 2
}

interface GetChallengeEvevntProp {
  contract: Contract
  challenger: string
}

interface GetChallengeProp {
  contract: Contract
  groupId: string
  challenger: string
}

export const getAllChallenges = async ({
  contract,
  challenger
}: GetChallengeEvevntProp) => {
  await contract.events.NewChallenge(
    {
      filter: { proposer: challenger },
      fromBlock: 0
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

interface PastEventProp {
  fromBlock: number
  toBlock?: number | 'latest'
  filter?: object
}

export const getAllPastEvents = async (
  contract: Contract | null,
  event: string = 'allEvents',
  options?: PastEventProp
) => {
  options = options || { fromBlock: 0 }
  if (!contract) {
    return
  }
  return await contract.getPastEvents(event, options)
}

export const getPastSponsor = async (
  contract: Contract | null,
  sponserSize?: number,
  options?: PastEventProp
) => {
  options = options || { fromBlock: 0 }

  let response = {
    blockNumber: 0,
    data: [] as Sponsor[]
  }
  let data: any[] = []
  const sponsers =
    (await getAllPastEvents(contract, 'SponsorChallenge', options)) || []

  if (!sponsers.length) {
    return response
  }

  sponserSize = sponserSize || sponsers.length
  data = sponsers.slice(sponserSize * -1).reverse()
  response.blockNumber = data[0].blockNumber

  response.data =
    data.map(sponsor => {
      const { amount, comment, who } = sponsor.returnValues
      return {
        amount,
        comment,
        who
      }
    }) || []

  return response
}

interface SponsorEventProp {
  contract: Contract
  challenger: string
  fromBlock?: number
  callback?: (sponser: Sponsor) => void
}
export const sponsorEvents = async ({
  contract,
  challenger,
  fromBlock = 0,
  callback
}: SponsorEventProp) => {
  contract.events
    .SponsorChallenge({
      filter: { challenger: challenger },
      fromBlock: fromBlock ? fromBlock + 1 : fromBlock
    })
    .on('data', function(event) {
      console.log(event)
      if (callback) {
        const { amount, comment, who } = event.returnValues
        callback({
          amount,
          comment,
          who
        })
      }
    })
}

// interface GetSponsorProp {
//   contract: Contract
//   groupId: string
//   address: string
//   sponsorSize: number
// }

// export const getChellengeSponsors = async ({
//   contract,
//   groupId,
//   address,
//   sponsorSize
// }: GetSponsorProp) => {
//   let sponsors: Sponsor[] = []
//   for (let i = 0; i < sponsorSize; i++) {
//     const sponsor = await contract.methods
//       .getSponsor(groupId, address, i)
//       .call()
//     sponsors.push({
//       who: sponsor._who,
//       amount: sponsor._amount,
//       comment: sponsor._comment
//     })
//   }
//   return sponsors
// }

interface SponsorProp {
  contract: Contract
  groupId: string
  address: string
  from: string
  amount: number
  comment: string
}

export const sponsorChallenge = async ({
  contract,
  groupId,
  address,
  from,
  amount,
  comment
}: SponsorProp) => {
  await contract.methods
    .sponsorChallenge(groupId, address, comment)
    .send({
      from,
      value: amount
    })
    .on('error', (err: any) => {
      console.log('sponer error')
      console.log(err)
    })
    .then((res: any) => {
      console.log('sponser success')
      console.log(res)
    })
}

// contract.getPastEvents('allEvents', {fromBlock: 0}, function(error, events){ console.log(events); })

// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })
