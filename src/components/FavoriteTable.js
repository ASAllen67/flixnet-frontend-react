import React from 'react'
import { connect } from 'react-redux'
import { FaHeartBroken } from 'react-icons/fa'
import poster_placeholder from '../images/poster_placeholder.jpeg'
import { backend_api } from '../constants'

class FavoriteTable extends React.Component {

	deleteFavorite = (id, tmdb_id) => {
		this.props.dispatch({ type: "DELETE_FAVORITE", id, tmdb_id })

		fetch(`${backend_api}/favorites/${id}`, {
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
						<th>Your Score</th>
						<th>Remove Favorite</th>
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
								<td><FaHeartBroken onClick={()=> this.deleteFavorite(e.id, e.tmdb_id)} className="mt-heart-click"/></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
}

let mapStateToProps = state => ({ entries: state.user.favorites })
export default connect(mapStateToProps)(FavoriteTable)
