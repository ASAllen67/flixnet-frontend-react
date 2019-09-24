import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import promise from 'redux-promise-middleware'
// import thunk from 'redux-thunk'
import rootReducer from './reducers/root'

// const middleware = applyMiddleware(promise,thunk)
// const middleware = applyMiddleware(thunk)
// export default createStore(rootReducer, composeWithDevTools(middleware))
export default createStore(rootReducer, composeWithDevTools())
