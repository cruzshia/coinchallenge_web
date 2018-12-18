export const CREATE_CHALLENGE_GROUP = 'CREATE_CHALLENGE_GROUP'
export const SET_CREATE_RESULT = 'SET_CREATE_RESULT'

export const newChallengeGroup = (payload: object) => ({
  type: CREATE_CHALLENGE_GROUP,
  payload
})

export const setCreateResult = (payload: object) => ({
  type: SET_CREATE_RESULT,
  payload
})
