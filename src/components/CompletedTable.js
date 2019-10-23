import React from 'react'
import { connect } from 'react-redux'
import { FaRegHeart } from 'react-icons/fa'
import { GiCrownedHeart } from 'react-icons/gi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import poster_placeholder from '../images/poster_placeholder.jpeg'
import { backend_api } from '../constants'


class CompletedTable extends React.Component {

	deleteEntry = (id, tmdb_id) => {
		this.props.dispatch({ type: "DELETE_COMPLETED_ENTRY", id, tmdb_id })
		
		fetch(`${backend_api}/completed_entries/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${localStorage.token}` }
		})
	}

	createFavorite = entry => {
		fetch(`${backend_api}/favorites`, {
			method: "POST",
			headers: { Authorization: `Bearer ${localStorage.token}`,
				"Content-type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ entry })
		})
		.then(res => res.json())
		.then(res => {
			if (res.favorite) {
				this.props.dispatch({ type: "ADD_FAVORITE", favorite: res.favorite })
			}
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
						<th>Your Score</th>
						<th>Mark Favorite</th>
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
								<td>{e.score === 0 ? "-" : e.score}</td>
								<td>{ this.props.favorite_ids.includes(e.tmdb_id) ? <GiCrownedHeart className="mt-heart"/> : <FaRegHeart className="mt-heart-click" onClick={()=> this.createFavorite(e)}/> }</td>
								<td><IoIosCloseCircleOutline onClick={()=> this.deleteEntry(e.id, e.tmdb_id)} className="mt-delete"/></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
}

let mapStateToProps = state => ({ entries: state.user.completed_entries, favorite_ids: state.user.favorite_ids })
export default connect(mapStateToProps)(CompletedTable)
