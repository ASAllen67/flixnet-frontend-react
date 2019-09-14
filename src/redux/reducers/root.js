import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'

export default combineReducers({
  session: sessionReducer,
  user: userReducer
})
