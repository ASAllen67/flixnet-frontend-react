import React from 'react'
import { connect } from 'react-redux'
import { create_entry, destroy_entry } from '../actions/entries'
import { GiCrownedHeart as FullHeart } from 'react-icons/gi'
import { IoIosCloseCircleOutline, IoMdHeartEmpty as EmptyHeart } from 'react-icons/io'
import poster_placeholder from '../images/poster_placeholder.jpeg'


class CompletedTable extends React.Component {

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
					<td>{ this.props.favorites[mid] ? <FullHeart className='mt-heart'/> : <EmptyHeart className='mt-heart-click' onClick={()=> create_entry(mid, e, 'favorites', this.props.dispatch)}/> }</td>
					<td><IoIosCloseCircleOutline onClick={()=> destroy_entry(mid, 'completed', this.props.dispatch)} className='mt-delete'/></td>
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
						<th>Mark Favorite</th>
						<th>Delete Entry</th>
					</tr>
				</thead>
				<tbody>
					{ this.getTableBody() }
				</tbody>
			</table>
		)
	}
}

let mapStateToProps = state => ({ entries: state.user.completed, favorites: state.user.favorites })
export default connect(mapStateToProps)(CompletedTable)
