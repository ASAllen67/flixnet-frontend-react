import React from 'react'
import { connect } from 'react-redux'
import { destroy_entry } from '../actions/entries'
import { FaHeartBroken } from 'react-icons/fa'
import poster_placeholder from '../images/poster_placeholder.jpeg'
import { backend_api } from '../constants'

class FavoriteTable extends React.Component {

	deleteFavorite = (id, mid) => {
		this.props.dispatch({ type: 'DELETE_FAVORITE', id, mid })

		fetch(`${backend_api}/favorites/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.token}` }
		})
	}

	getTableBody = () => {
		const { entries } = this.props
		return Object.keys(entries).map((mid, index) => {

			const e = entries[mid]
			let poster_source = e.poster_path ? `https://image.tmdb.org/t/p/w154${e.poster_path}` : poster_placeholder

			return (
				<tr key={index}>
					<td>{index+1}</td>
					<td><img className='mt-poster' src={poster_source} alt='movie-poster'/></td>
					<td className='mt-table-title no-wrap'>{e.title}</td>
					<td className='mt-overview'>{e.overview}</td>
					<td>{e.score === 0 ? '-' : e.score}</td>
					<td><FaHeartBroken onClick={()=> destroy_entry(mid, 'favorites', this.props.dispatch)} className='mt-heart-click'/></td>
				</tr>
			)
		})
	}

	render() {
		return (
			<table className='mt-table table table-dark'>
				<thead>
					<tr className='no-wrap'>
						<th>#</th>
						<th>Poster</th>
						<th>Title</th>
						<th className='mt-overview'>Overview</th>
						<th>Your Score</th>
						<th>Remove Favorite</th>
					</tr>
				</thead>
				<tbody>
					{ this.getTableBody() }
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = state => ({ entries: state.user.favorites })
export default connect(mapStateToProps)(FavoriteTable)
