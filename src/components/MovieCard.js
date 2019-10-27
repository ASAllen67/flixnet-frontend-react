import React from 'react'
import ReactTooltip from 'react-tooltip'
import { FaEye, FaRegListAlt } from 'react-icons/fa'
import { GiCrownedHeart } from 'react-icons/gi'
import poster_placeholder from '../images/poster_placeholder.jpeg'

export default function MovieCard (props) {
	let m = props.movie
	let poster_source = m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : poster_placeholder

	let topDiv = 
	<div className='mc-status'>
		{ props.seen && <span data-tip="You've seen this one before"><FaEye className='mc-svg eye svg-align'/></span> }
		{ props.backlogged && <span data-tip='This movie is in your Backlog'><FaRegListAlt className='mc-svg backlog svg-align'/></span> }
		{ props.favorited && <span data-tip='Favorited'><GiCrownedHeart className='mc-svg heart svg-align'/></span> }
		<ReactTooltip/>
	</div>

	return (
		<div className='movie-card'>
			{ topDiv }
			<img className='mc-poster' src={poster_source} alt='movie-poster'/>
			<div className='mc-title'>{m.title}</div>
		</div>
	)
}