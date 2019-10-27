import React from 'react'
import { connect } from 'react-redux'
import { complete_entry, destroy_entry } from '../actions/entries'
import { IoIosCloseCircleOutline as Ex, IoIosCheckmarkCircleOutline as Check } from 'react-icons/io'
import poster_placeholder from '../images/poster_placeholder.jpeg'


class BacklogTable extends React.Component {

	getTableBody = () => {
		const entries = this.props.entries
		return Object.keys(entries).map((mid, index) => {
			const e = entries[mid]
			let poster_source = e.poster_path ? `https://image.tmdb.org/t/p/w154${e.poster_path}` : poster_placeholder

			return (
				<tr key={index}>
					<td>{index+1}</td>
					<td><img className='mt-poster' src={poster_source} alt='movie-poster'/></td>
					<td className='mt-table-title no-wrap'>{e.title}</td>
					<td className='mt-overview'>{e.overview}</td>
					<td><Check className='mt-check' onClick={()=> complete_entry(mid, e, this.props.dispatch)}/></td>
					<td><Ex className='mt-delete' onClick={()=> destroy_entry(mid, 'backlog', this.props.dispatch)}/></td>
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
						<th>Mark Completed</th>
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

const mapStateToProps = state => ({ entries: state.user.backlog })
export default connect(mapStateToProps)(BacklogTable)
