import React from 'react'
import { connect } from 'react-redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import poster_placeholder from '../images/poster_placeholder.jpeg'


function BacklogTable (props) {
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
				{props.movies.map((m, index) => {
					let poster_source = m.poster_path ? `https://image.tmdb.org/t/p/w154${m.poster_path}` : poster_placeholder
					return (
						<tr key={index}>
							<td>{index+1}</td>
							<td><img className="mt-poster" src={poster_source} alt="movie-poster"/></td>
							<td className="mt-table-title no-wrap">{m.title}</td>
							<td className="mt-overview">{m.overview}</td>
							<td><FaRegCheckCircle className="mt-check"/></td>
							<td><IoIosCloseCircleOutline className="mt-delete"/></td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

let mapStateToProps = state => ({ movies: state.user.backlog_entries, favorite_ids: state.user.favorite_ids })
export default connect(mapStateToProps)(BacklogTable)
