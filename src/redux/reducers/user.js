const initialState = {
  completed_entries: [],
  backlog_entries: [],
  favorites: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_USER': {
      return {...action.user }
    }

    default: { return state }
  }
}
