let initialState = {
  seen_ids: [],
  backlog_ids: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_USER':
      return {...action.user }

    case 'MESSAGE_SENT': {
      let newArr = state.sent_messages.slice()
      newArr.push(action.message)
      return {...state, sent_messages: newArr }
    }

    default: { return state }
  }
}
