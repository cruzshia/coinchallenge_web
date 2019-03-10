import Contract from 'web3/eth/contract'
import { Sponsor, ChallengeType } from '@Src/typing/globalTypes'
import { parseChallenge } from '@Utils/contractUtils'
import web3 from 'web3'
import { number } from 'prop-types'
//process.env.REACT_APP_CONTRACT_ADDRESS

interface GetGroupProp {
  contract: Contract
  groupId: string
  minAmount: number
}

export const getChallengeGroup = async (props: GetGroupProp) => {
  const { contract, groupId } = props
  const res = await contract.methods.getChallengeGroup(groupId).call()
  return {
    name: res._name,
    url: res._url,
    minAmount: Number(web3.utils.fromWei(res._minAmount))
  }
}

interface GetChallengeProp {
  contract: Contract
  groupId: string
  challenger: string
}

interface GetChallengeEvevntProp {
  contract: Contract
  filter?: {
    challenger?: string
  }
  callback?: Function
}

export const newChallengesEvents = async ({
  contract,
  filter,
  callback
}: GetChallengeEvevntProp) => {
  await contract.events.NewChallenge(
    {
      filter
    },
    function(_error: any, event: any) {
      const {
        challenger,
        groupId,
        targetDays,
        totalDays,
        startTimestamp,
        amount
      } = event.returnValues
      callback &&
        callback({
          proposer: challenger,
          groupId,
          targetDays,
          totalDays,
          startTimestamp,
          amount
        })
    }
  )
}

export const getPastChallenges = async ({
  contract,
  groupId,
  challenger
}: GetChallengeProp) => {
  const finishChallenges =
    (await getAllPastEvents(contract, 'FinishChallenge', {
      fromBlock: 0,
      filter: { groupId, challenger }
    })) || []

  const data: Array<ChallengeType> = []

  for (let i = 0; i < finishChallenges.length; i++) {
    const { returnValues } = finishChallenges[i]
    data.push({
      round: returnValues.round,
      targetDays: returnValues.targetDays,
      totalDays: returnValues.totalDays,
      completeDays: returnValues.completeDays,
      startTimestamp: returnValues.startTimestamp,
      sponserSize: 0,
      amount: returnValues.amount,
      totalSponsorAmount: returnValues.totalSponsorAmount,
      status: returnValues.status,
      goal: returnValues.goal
    })
  }

  return data
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
  round: number,
  groupId: string,
  challenger: string,
  sponserSize: number = 0,
  options?: PastEventProp
) => {
  options = options || { fromBlock: 0 }

  let response = {
    data: [] as Sponsor[]
  }
  let sponsers: any[] = []

  if (contract) {
    let sponsor: any | undefined
    let i = 0
    while (i === 0 || sponsor._who) {
      try {
        sponsor = await contract.methods
          .getSponsor(groupId, challenger, round, i)
          .call()

        sponsers.push({
          who: sponsor._who,
          amount: sponsor._amount,
          comment: sponsor._comment
        })
      } catch (error) {
        sponsor = {}
      }
      i++
    }
  }

  if (!sponsers.length) {
    return response
  }

  sponserSize = sponserSize || sponsers.length
  // data = sponsers.slice(sponserSize * -1).reverse()

  response.data = sponsers || []

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
  callback
}: SponsorEventProp) => {
  contract.events
    .SponsorChallenge({
      filter: { challenger }
    })
    .on('data', function(event) {
      if (callback) {
        const { amount, comment, sponsor } = event.returnValues
        callback({
          amount,
          comment,
          who: sponsor
        })
      }
    })
}

interface GetChallengeServerProp {
  contract: Contract
  groupId: string
  challenger: string
  round?: number
}
export const getChallenge = async ({
  contract,
  groupId,
  challenger,
  round
}: GetChallengeServerProp) => {
  const method = round && round > 0 ? 'getChallenge' : 'getCurrentChallenge'
  const params =
    method === 'getChallenge'
      ? [groupId, challenger, round]
      : [groupId, challenger]
  const response = await contract.methods[method](...params).call()
  return parseChallenge(response)
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
