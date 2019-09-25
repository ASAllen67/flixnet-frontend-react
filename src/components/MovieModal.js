import React, { Fragment } from 'react'
import Modal from 'react-modal'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { TMDB_genres, months } from '../constants'

export default function MovieModal (props) {
	let m = props.movie
	let release_date = null
	let genres = null
	let overview = null

	if (m.release_date) {
		let dateArr = m.release_date.split('-')
		release_date =
		<h5 className="mm-h5">
			{`Released on ${months[parseInt(dateArr[1])-1]} ${dateArr[2]}, ${dateArr[0]}`}
		</h5>
	}

	if (m.genre_ids.length) {
		genres =
		<h5 className="mm-h5">
			Genres: { m.genre_ids.map(g => TMDB_genres[g]).join(", ") }
		</h5>
	}

	if (m.overview) {
		overview =
		<Fragment>
			<br/>
			<div className="mm-overview-container">
				<h5 className="mm-overview-label">Overview</h5>
				<p className="mm-overview-text">"{m.overview}"</p>
			</div>
		</Fragment>
	}


	return (
		<Modal className="movie-modal" isOpen={true}>
			<div className="mm-close-div"><IoIosCloseCircleOutline className="mm-close" onClick={props.closeModal}/></div>
			<h1 className="mm-h1">{m.title}</h1>
			{ release_date }
			{ genres }
			{ overview }
			<br/>
			<div></div>
		</Modal>
	)
}