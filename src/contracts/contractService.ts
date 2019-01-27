import Contract from 'web3/eth/contract'
import { Sponsor } from '@Src/typing/globalTypes'
import { parseChallenge } from '@Utils/contractUtils'
//process.env.REACT_APP_CONTRACT_ADDRESS

interface GetGroupProp {
  contract: Contract
  groupId: string
}

export const getChallengeGroup = async (props: GetGroupProp) => {
  const { contract, groupId } = props
  const res = await contract.methods.getChallengeGroup(groupId).call()
  return {
    name: res._name,
    url: res._url
  }
}

interface GetChallengeProp {
  contract: Contract
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
      filter,
      fromBlock: 0
    },
    function(_error: any, event: any) {
      const {
        proposer,
        groupId,
        targetDays,
        totalDays,
        startDayTimestamp,
        amount
      } = event.returnValues
      callback &&
        callback({
          proposer,
          groupId,
          targetDays,
          totalDays,
          startDayTimestamp,
          amount
        })
    }
  )
}

export const getPastChallenges = async ({
  contract,
  challenger
}: GetChallengeProp) => {
  let statusData = new Array(3).fill(0)
  const finishChallenges =
    (await getAllPastEvents(contract, 'FinishChallenge', {
      fromBlock: 0,
      filter: { who: challenger }
    })) || []
  for (let i = 0; i < finishChallenges.length; i++) {
    const { status } = finishChallenges[i].returnValues
    statusData[status]++
  }
  return statusData
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
  groupId: string,
  challenger: string,
  sponserSize: number = 0,
  options?: PastEventProp
) => {
  options = options || { fromBlock: 0 }

  let response = {
    data: [] as Sponsor[]
  }
  let data: any[] = []
  const sponsers: any[] = []
  if (contract) {
    for (let i = 0; i < sponserSize; i++) {
      const sponsor = await contract.methods
        .getSponsor(groupId, challenger, i)
        .call()
      sponsers.push(sponsor)
    }
  }

  if (!sponsers.length) {
    return response
  }

  sponserSize = sponserSize || sponsers.length
  data = sponsers.slice(sponserSize * -1).reverse()

  response.data =
    data.map(sponsor => {
      return {
        amount: sponsor._amount,
        comment: sponsor._comment,
        who: sponsor._who
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
  callback
}: SponsorEventProp) => {
  const pastSponseors =
    (await getAllPastEvents(contract, 'SponsorChallenge', {
      fromBlock: 0,
      filter: { challenger }
    })) || []

  contract.events
    .SponsorChallenge({
      filter: { challenger },
      fromBlock: pastSponseors.length
        ? pastSponseors[pastSponseors.length - 1].blockNumber + 1
        : 0
    })
    .on('data', function(event) {
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

interface GetChallengeServerProp {
  contract: Contract
  groupId: string
  challenger: string
}
export const getChallenge = async ({
  contract,
  groupId,
  challenger
}: GetChallengeServerProp) => {
  const response = await contract.methods
    .getChallenge(groupId, challenger)
    .call()
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
