import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { Table } from 'react-bootstrap'
import {
	FaEye as Eye,
	FaEyeSlash as NoEye,
	FaHeart as FullHeart,
	FaRegHeart as EmptyHeart,
	FaRegWindowClose as Ex,
	FaRegListAlt as Notes
} from 'react-icons/fa'
// import { IoIosCloseCircleOutline as Ex } from 'react-icons/io'
import poster_placeholder from '../../images/poster_placeholder.jpeg'
import { create_entry, destroy_entry } from '../../actions/entries'


class CompletedTable extends React.Component {

	getTableBody = () => {
		const d = this.props.dispatch
		const { entries } = this.props

		return Object.keys(entries).map((mid, index) => {
			const e = entries[mid]
			const poster_source = e.poster_path ? `https://image.tmdb.org/t/p/w154${e.poster_path}` : poster_placeholder

			return (
				<tr key={index} className='mt-row'>
					<td>{index+1}</td>
					<td><img className='mt-poster' src={poster_source} alt='movie-poster'/></td>
					<td className='mt-table-title'>{e.title}</td>
					<td>{e.score === 0 ? '-' : e.score}</td>
					<td className='mt-overview'>{ this.props.hideOverview ? null : e.overview }</td>
					<td>
						<div className='mt-edit'>
							{ this.props.favorites[mid] ?
								<span data-tip='Favorited'>
									<FullHeart className='mt-heart svg-edit'/>
								</span>
								:
								<span data-tip='Add to Favorites'>
									<EmptyHeart className='mt-heart-click svg-edit' onClick={()=> create_entry(mid, e, 'favorites', d)}/>
								</span>
							}
							<br/>
							<span data-tip='Edit Entry'>
								<Notes className='mt-notes svg-edit' onClick={() => this.props.toggleModal({ mid, e })}/>
							</span>
							<br/>
							<span data-tip='Delete Entry'>
								<Ex onClick={()=> destroy_entry(mid, 'completed', d)} className='mt-delete svg-edit'/>
							</span>
							<ReactTooltip key={this.props.hideOverview ? 0 : 1}/>
						</div>
					</td>
				</tr>
			)
		})
	}

	render() {
		return (
			<Table striped className='mt-table table-dark'>
				<thead>
					<tr>
						<th>#</th>
						<th>Poster</th>
						<th>Title</th>
						<th>Score</th>
						<th className='mt-overview'>
							{ this.props.hideOverview ?
									<span data-tip='Show overview'>
									<NoEye className='mt-eye svg-align' onClick={this.props.toggleOverview}/>
								</span>
								:
								<Fragment>
									Overview&nbsp;&nbsp;
									<span data-tip='Hide overview'>
										<Eye className='mt-eye svg-align' onClick={this.props.toggleOverview}/>
									</span>
								</Fragment>
							}
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ this.getTableBody() }
				</tbody>
			</Table>
		)
	}
}

let mapStateToProps = state => ({ entries: state.user.completed, favorites: state.user.favorites })
export default connect(mapStateToProps)(CompletedTable)
