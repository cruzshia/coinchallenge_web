export interface Action {
  type: string
  payload?: {
    userId: string
  }
}

export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_DATA_DONE = 'FETCH_DATA_DONE'
export const fetchData = () => ({type: FETCH_DATA})
export const fetchDone = (payload: object) => ({type: FETCH_DATA_DONE, payload})