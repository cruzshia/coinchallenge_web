export interface ChallengeGroupType {
  id: string
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
