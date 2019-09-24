import React from 'react'
import Modal from 'react-modal'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { TMDB_genres, months } from '../constants'

export default function MovieModal (props) {
	console.log(props.movie)
	let m = props.movie

	let dateArr = m.release_date.split('-')
	let date = `${months[parseInt(dateArr[1])-1]} ${dateArr[2]}, ${dateArr[0]}`

	return (
		<Modal className="movie-modal" isOpen={true} onClick={console.log}>
			<div className="mm-close-div"><IoIosCloseCircleOutline className="mm-close" onClick={props.closeModal}/></div>
			<h1 className="mm-h1">{m.title}</h1>
			<h5 className="mm-h5">Released on {date}</h5>
			<h5 className="mm-h5">Genres: { m.genre_ids.map(g => TMDB_genres[g]).join(", ") }</h5>
			<p className="mm-overview">"{ m.overview }"</p>
		</Modal>
	)
}