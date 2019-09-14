import React from 'react'
// import { Card, Image } from "react-bootstrap"

export default function MovieCard (props) {
	let m = props.movie
	return (
		<div className="movie-card">
			<img className="movie-poster" src={`https://image.tmdb.org/t/p/w342${m.poster_path}`} alt="movie-poster"/>
			<div className="movie-title">{m.title}</div>
		</div>
	)
}