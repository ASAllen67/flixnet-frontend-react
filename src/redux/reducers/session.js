const initialState = {
  loggedIn: !!localStorage.token
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_IN': {
      // token is put into localStorage in the Login.js component
      return {...state, loggedIn: true }
    }

    case 'LOG_OUT': {
      localStorage.removeItem('token')
      return {...state, loggedIn: false }
    }

    default: { return state }
  }
}
