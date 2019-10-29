import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import TrackerForm from './TrackerForm'
import { FaRegCheckCircle as Check } from 'react-icons/fa'
import { IoIosCloseCircleOutline as Ex } from 'react-icons/io'
import { TMDB_genres, months } from '../constants'
import '../stylesheets/SearchModal.scss'

class SearchModal extends React.Component {

	componentDidMount() {
		document.body.style.overflow = 'hidden'  
	}

	componentWillUnmount() {
		document.body.style.overflow = 'unset'
	}

	showForm = ()=> {
		if (this.props.user.completed[this.props.movie.id])
			return <div>You've seen this movie <Check className='svg-align green'/></div>

		if (this.props.user.backlog[this.props.movie.id])
			return <div>You have backlogged this movie <Check className='svg-align green'/></div>

		else
			return <TrackerForm movie={this.props.movie}/>
	}

	render() {
		let m = this.props.movie
		let release_date = null
		let genres = null
		let overview = null

		if (m.release_date) {
			let dateArr = m.release_date.split('-')
			release_date =
			<h5 className='mm-h5'>
				{`Released on ${months[parseInt(dateArr[1])-1]} ${dateArr[2]}, ${dateArr[0]}`}
			</h5>
		}

		if (m.genre_ids.length) {
			genres =
			<h5 className='mm-h5'>
				Genres: { m.genre_ids.map(g => TMDB_genres[g]).join(', ') }
			</h5>
		}

		if (m.overview) {
			overview =
			<Fragment>
				<br/>
				<div className='mm-overview-container'>
					<h5 className='mm-overview-label'>Overview</h5>
					<p className='mm-overview-text'>"{m.overview}"</p>
				</div>
			</Fragment>
		}

		return (
			<Modal className='movie-modal' isOpen={true}>
				<div className='mm-close-div'><Ex className='mm-close' onClick={this.props.closeModal}/></div>
				<h1 className='mm-h1'>{m.title}</h1>
				{ release_date }
				{    genres    }
				{   overview   }
				<br/>
				{ this.showForm() }
			</Modal>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(SearchModal)
