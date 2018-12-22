export const CREATE_CHALLENGE_GROUP = 'CREATE_CHALLENGE_GROUP'
export const SET_CREATE_RESULT = 'SET_CREATE_RESULT'

export const newChallengeGroup = (payload: object) => ({
  type: CREATE_CHALLENGE_GROUP,
  payload
})

interface SetResultProp {
  response: {
    status?: boolean
    gasUsed?: number
  }
  error: boolean
}

export const setCreateResult = (payload: SetResultProp) => ({
  type: SET_CREATE_RESULT,
  payload
})
