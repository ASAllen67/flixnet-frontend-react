const initialState = {
  completed_entries: [],
  completed_ids: [],

  backlog_entries: [],
  backlog_ids: [],

  favorites: [],
  favorite_ids: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case "SET_USER": {
    	return {...action.user }
    }

    case "ADD_FAVORITE": {
      let favorites = state.favorites.slice()
      let favorite_ids = state.favorite_ids.slice()

      favorites.push(action.favorite)
      favorite_ids.push(action.favorite.tmdb_id)

      return { ...state, favorites, favorite_ids }
    }

    case "DELETE_FAVORITE": {
      let favorites = state.favorites.filter(e => e.id !== action.id)
      let favorite_ids = state.favorite_ids.filter(id => id !== action.tmdb_id)

      return { ...state, favorites, favorite_ids }
    }

    case "ADD_COMPLETED_ENTRY": {
      console.log('adding new completed...')
      let completed_entries = state.completed_entries.slice()
      let completed_ids = state.completed_ids.slice()

      completed_entries.push(action.entry)
      completed_ids.push(action.entry.tmdb_id)

      return { ...state, completed_entries, completed_ids }
    }

    case "DELETE_COMPLETED_ENTRY": {
      let completed_entries = state.completed_entries.filter(e => e.id !== action.id)
      let completed_ids = state.completed_ids.filter(id => id !== action.tmdb_id)

      let favorites = state.favorites.filter(e => e.tmdb_id !== action.tmdb_id)
      let favorite_ids = state.favorite_ids.filter(id => id !== action.tmdb_id)

      return { ...state, completed_entries, completed_ids, favorites, favorite_ids }
    }

    case "ADD_BACKLOG_ENTRY": {
      let backlog_entries = state.backlog_entries.slice()
      let backlog_ids = state.backlog_ids.slice()

      backlog_entries.push(action.entry)
      backlog_ids.push(action.entry.tmdb_id)

      return { ...state, backlog_entries, backlog_ids }
    }

    case "DELETE_BACKLOG_ENTRY": {
      let backlog_entries = state.backlog_entries.filter(e => e.id !== action.id)
      let backlog_ids = state.backlog_ids.filter(id => id !== action.tmdb_id)

      return { ...state, backlog_entries, backlog_ids }
    }

    default:  { return state }
  }
}
