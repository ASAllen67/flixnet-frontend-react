import React from 'react'
import poster_placeholder from '../images/poster_placeholder.jpeg'

export default function MovieCard (props) {
	let m = props.movie
	let poster_source = m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : poster_placeholder

	return (
		<div className="movie-card">
			<img className="movie-poster" src={poster_source} alt="movie-poster"/>
			<div className="movie-title">{m.title}</div>
		</div>
	)
}