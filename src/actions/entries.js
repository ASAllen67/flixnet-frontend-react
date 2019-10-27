import { backend_api } from '../constants'

//__________________________________________________//

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

export const create_entry = (mid, entry, entry_type, dispatch) => {
	entry.id = mid
	post(entry, entry_type)
	.then(res => res.json())
	.then(res => dispatch({ type: 'ADD_ENTRY', mid, entry: res.entry, entry_type }));
}

//__________________________________________________//

const destroy = (mid, entry_type) => {
	return fetch(`${backend_api}/entries/${entry_type}/${mid}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${localStorage.token}` }
	})
}

export const destroy_entry = (mid, entry_type, dispatch) => {
	destroy(mid, entry_type);
	dispatch({ type: 'DELETE_ENTRY', mid, entry_type });
}

//__________________________________________________//

// deletes old backlog entry and creates new completed entry
export const complete_entry = (mid, entry, dispatch) => {
	entry.id = mid
	destroy(mid, 'backlog');
	post(entry, 'completed')
	.then(res => res.json())
	.then(res => dispatch({ type: 'COMPLETE_ENTRY', mid, entry: res.entry }));
}
