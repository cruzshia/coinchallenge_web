import { type } from 'os'

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
  round: number
  targetDays: number
  totalDays: number
  completeDays: number
  startTimestamp: number
  sponserSize: number
  amount: number
  totalSponsorAmount: number
  status?: number
  goal: string
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

export type ChainType = 'ethereum' | 'dexon'
