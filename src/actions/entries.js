import { backend_api } from '../constants'


//____________________ FETCH ____________________//

const post = (entry, entry_type) => {
	return fetch(`${backend_api}/entries/${entry_type}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.token}`,
			'Content-type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(entry)
	});
}

const patch = (entry, entry_type) => {
	return fetch(`${backend_api}/entries/${entry_type}/${entry.id}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${localStorage.token}`,
			'Content-type': 'application/json'
		},
		body: JSON.stringify(entry)
	});
}

const destroy = (mid, entry_type) => {
	return fetch(`${backend_api}/entries/${entry_type}/${mid}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${localStorage.token}`,
			'Content-type': 'application/json'
		}
	});
}


//____________________ EXPORT / DISPATCH ____________________//

export const destroy_entry = (mid, entry_type, dispatch) => {
	destroy(mid, entry_type)
	dispatch({ type: 'DESTROY_ENTRY', mid, entry_type })
}

export const create_entry = (mid, entry, entry_type, dispatch) => {
	entry.id = mid
	post(entry, entry_type)
	.then(res => res.json())
	.then(res => dispatch({ type: 'CREATE_ENTRY', mid, entry: res.entry, entry_type }))
}

export const update_entry = (mid, entry, entry_type, dispatch) => {
	entry.id = mid
	patch(entry, entry_type)
	dispatch({ type: 'UPDATE_ENTRY', entry, entry_type  })
}

// deletes old backlog entry and creates new completed entry
export const complete_entry = (mid, entry, dispatch) => {
	entry.id = mid
	destroy(mid, 'backlog')
	post(entry, 'completed')
	.then(res => res.json())
	.then(res => dispatch({ type: 'COMPLETE_ENTRY', mid, entry: res.entry }))
}

