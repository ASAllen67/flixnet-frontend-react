import React from 'react'
import ReactTooltip from 'react-tooltip'
import {
	FaEye as Eye,
	FaRegListAlt as List,
	FaHeart as FullHeart
} from 'react-icons/fa'
import poster_placeholder from '../images/poster_placeholder.jpeg'

class MovieCard extends React.Component {

	componentDidUpdate() {
  	ReactTooltip.rebuild();
	}

	render() {
		let m = this.props.movie
		let poster_source = m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : poster_placeholder

		let topDiv = 
		<div className='mc-status'>
			{ this.props.seen && <span data-tip="You've seen this one before"><Eye className='mc-svg eye svg-align'/></span> }
			{ this.props.backlogged && <span data-tip='This movie is in your Backlog'><List className='mc-svg backlog svg-align'/></span> }
			{ this.props.favorited && <span data-tip='Favorited'><FullHeart className='mc-svg heart svg-align'/></span> }
		</div>

		return (
			<div className='movie-card'>
				{ topDiv }
				<img className='mc-poster' src={poster_source} alt='movie-poster'/>
				<div className='mc-title'>{m.title}</div>
				<ReactTooltip/>
			</div>
		)
	}
}

export default MovieCard
