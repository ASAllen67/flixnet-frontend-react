import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { Table } from 'react-bootstrap'
import { IoMdCheckboxOutline as Check } from 'react-icons/io'
import { 
	FaEye as Eye,
	FaEyeSlash as NoEye,
	FaRegWindowClose as Ex,
	FaRegListAlt as Notes
} from 'react-icons/fa'
import poster_placeholder from '../../images/poster_placeholder.jpeg'
import { complete_entry, destroy_entry } from '../../actions/entries'


class BacklogTable extends React.Component {

	getTableBody = () => {
		const d = this.props.dispatch
		const entries = this.props.entries

		return Object.keys(entries).map((mid, index) => {
			const e = entries[mid]
			const poster_source = e.poster_path ? `https://image.tmdb.org/t/p/w185${e.poster_path}` : poster_placeholder

			return (
				<tr key={index} className='mt-row'>
					<td className='mt-index'>{index+1}</td>
					<td className='mt-poster'><img className='mt-poster-img' src={poster_source} alt='movie-poster'/></td>
					<td className='mt-title'>{e.title}</td>
					<td className='mt-overview'>{ this.props.hideOverview ? null : e.overview }</td>
					<td className='mt-last'>
						<div className='mt-edit'>
							<span data-tip='Mark completed'>
								<Check className='mt-check svg-edit' onClick={() => complete_entry(mid, e, d)}/>
							</span>
							<br/>
							<span data-tip='Edit Entry'>
								<Notes className='mt-notes svg-edit' onClick={() => this.props.toggleModal({ mid, e })}/>
							</span>
							<br/>
							<span data-tip='Delete Entry'>
								<Ex onClick={() => destroy_entry(mid, 'backlog', d)} className='mt-delete svg-edit'/>
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
					<tr className='no-wrap'>
						<th className='mt-index'></th>
						<th>Poster</th>
						<th>Title</th>
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

const mapStateToProps = state => ({ entries: state.user.backlog })
export default connect(mapStateToProps)(BacklogTable)
