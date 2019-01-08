import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducer'

import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'

const epicMiddleware = createEpicMiddleware()
let middlewares: Array<any> = [epicMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ stateTransformer: state => state.toJS() }))
}

let store = createStore(rootReducer, applyMiddleware(...middlewares))
epicMiddleware.run(rootEpic)

export default store
