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
      let entries = copyObj(state[action.entry_type])
      entries[action.entry.id] = action.entry

      return { ...state, [action.entry_type]: entries }
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
