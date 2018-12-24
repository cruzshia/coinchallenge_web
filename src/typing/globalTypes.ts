export interface ChallengeGroupType {
  id: string
  name: string
  url: string
  minDays: string
  maxDays: string
  maxDelayDays: string
  minAmount: string
  agent?: string
}

export interface ChallengeType {
  targetDays: number
  totalDays: number
  completeDays: number
  startDayTimestamp: number
  sponserSize: number
}

export interface Action {
  type: string
  payload?: { [s: string]: any }
}

export interface Sponsor {
  who: string
  amount: number
  comment: string
}
