const initialState = {
  username: '',
  completed: {},
  backlog: {},
  favorites: {}
}

// Deep copy: JSON.parse(JSON.stringify(obj))
// Shallow copy: Object.assign({}, obj)
const copyObj = obj => Object.assign({}, obj);

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_USER': {
    	return { ...action.user }
    }

    case 'CREATE_ENTRY': {
      let entries = copyObj(state[action.entry_type])
      entries[action.mid] = action.entry

      return { ...state, [action.entry_type]: entries }
    }

    case 'DESTROY_ENTRY': {
      let entries = copyObj(state[action.entry_type])
      delete entries[action.mid]

      return { ...state, [action.entry_type]: entries }
    }

    case 'UPDATE_ENTRY': {
      const { id } = action.entry
      let entries = copyObj(state[action.entry_type])
      entries[id] = action.entry
      let new_state = { ...state, [action.entry_type]: entries }

      if (action.entry_type === 'completed' && state.favorites[id]) {
        let favorites = copyObj(state.favorites)
        favorites[id] = action.entry
        new_state.favorites = favorites
      }
      else if (action.entry_type === 'favorites' && state.completed[id]) {
        let completed = copyObj(state.completed)
        completed[id] = action.entry
        new_state.completed = completed
      }

      return new_state
    }

    case 'COMPLETE_ENTRY': {
      let completed = copyObj(state.completed)
      completed[action.mid] = action.entry

      let backlog = copyObj(state.backlog)
      delete backlog[action.mid]

      return { ...state, completed, backlog }
    }

    default: { return state }
  }
}
