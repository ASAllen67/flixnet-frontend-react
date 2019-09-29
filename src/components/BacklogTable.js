import React from 'react'
import { connect } from 'react-redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import poster_placeholder from '../images/poster_placeholder.jpeg'
import { rails_api } from '../constants'


class BacklogTable extends React.Component {

	createCompletedEntry = entry => {
		fetch(`${rails_api}/completed_entries`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				"Content-type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ entry })
		})
		.then(res => res.json())
		.then(res => {
			if (res.entry) {
				this.props.dispatch({ type: "DELETE_BACKLOG_ENTRY", id: entry.id, tmdb_id: entry.tmdb_id })
				this.props.dispatch({ type: "ADD_COMPLETED_ENTRY", entry: res.entry })
			}
		})
	}

	deleteEntry = (id, tmdb_id) => {
		this.props.dispatch({ type: "DELETE_BACKLOG_ENTRY", id, tmdb_id })
		
		fetch(`${rails_api}/backlog_entries/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${localStorage.token}` }
		})
	}

	render() {
		return (
			<table className="mt-table table table-dark">
				<thead>
					<tr className="no-wrap">
						<th>#</th>
						<th>Poster</th>
						<th>Title</th>
						<th className="mt-overview">Overview</th>
						<th>Mark Completed</th>
						<th>Delete Entry</th>
					</tr>
				</thead>
				<tbody>
					{this.props.entries.map((e, index) => {
						let poster_source = e.poster_path ? `https://image.tmdb.org/t/p/w154${e.poster_path}` : poster_placeholder
						return (
							<tr key={index}>
								<td>{index+1}</td>
								<td><img className="mt-poster" src={poster_source} alt="movie-poster"/></td>
								<td className="mt-table-title no-wrap">{e.title}</td>
								<td className="mt-overview">{e.overview}</td>
								<td><FaRegCheckCircle className="mt-check" onClick={()=> this.createCompletedEntry(e)}/></td>
								<td><IoIosCloseCircleOutline className="mt-delete" onClick={()=> this.deleteEntry(e.id, e.tmdb_id)}/></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
}

let mapStateToProps = state => ({ entries: state.user.backlog_entries })
export default connect(mapStateToProps)(BacklogTable)
