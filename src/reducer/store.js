import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import logger from 'redux-logger'
import map from './mapReducer'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const reducers = { map }
const middlewares = [logger]

const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(...middlewares)),
      )
    : createStore(combineReducers(reducers))

export default store
