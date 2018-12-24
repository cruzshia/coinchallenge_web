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

export const getAllPastEvents = async (contract: Contract | null) => {
  if (!contract) {
    return
  }
  contract.getPastEvents('allEvents', { fromBlock: 0 }, function(
    error,
    events
  ) {
    console.log(events)
  })
}

interface SponsorEventProp {
  contract: Contract
  challenger: string
}
export const sponsorEvents = async ({
  contract,
  challenger
}: SponsorEventProp) => {
  contract.events
    .SponsorChallenge({
      filter: { challenger: challenger },
      fromBlock: 0
    })
    .on('data', function(event) {
      console.log(event)
    })
}

interface GetSponsorProp {
  contract: Contract
  groupId: string
  address: string
  sponsorSize: number
}

export const getChellengeSponsors = async ({
  contract,
  groupId,
  address,
  sponsorSize
}: GetSponsorProp) => {
  let sponsors: Sponsor[] = []
  for (let i = 0; i < sponsorSize; i++) {
    const sponsor = await contract.methods
      .getSponsor(groupId, address, i)
      .call()
    sponsors.push({
      who: sponsor._who,
      amount: sponsor._amount,
      comment: sponsor._comment
    })
  }
  return sponsors
}

interface SponsorProp {
  contract: Contract
  groupId: string
  address: string
}

export const sponsorChallenge = async ({
  contract,
  groupId,
  address
}: SponsorProp) => {
  for (let i = 0; i < 5; i++) {
    await contract.methods
      .sponsorChallenge(groupId, address, `I am with you bro. Cruz +${i + 1}`)
      .send({
        from: '0x35ace72f822f3adbd4cfa633358d5ed7161fa76e',
        value: 1000
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
}

// contract.getPastEvents('allEvents', {fromBlock: 0}, function(error, events){ console.log(events); })

// web3.eth.sendTransaction({
//   from: '0xE13acF256C86292d0f808eA58B8afFE162927a3D',
//   to: '0xCB4b9C9292410007D6FB7a7C061666B298f06ee2',
//   value: 2000000000000000000
// })
