import React from 'react'
import { connect } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { tmdb_key } from '../keys'
import MovieCard from '../components/MovieCard'
import '../stylesheets/Search.scss'


class Search extends React.Component {

  state = {
  	results: null,
  	page: 1
  }

  handleSearch = e => {
  	e.preventDefault()
  	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${e.target.query.value}&language=en-US&page=1&include_adult=false`)
  	.then(res => res.json())
  	.then(res => {
  		this.setState({ results: res.results, page: 1 })
  	})
  }

  displayResults = ()=> {
  	let results = this.state.results

  	if(results === null)
  		return "Let's find some movies to watch!"
  	else if (results.length === 0)
  		return "0 results found"
  	else
  		return (
  			<div className="search-results">
  				{ results.map(m => <MovieCard movie={m} key={m.id}/> )}
				</div>
			)
  }

	render() {
	  return (
	   <div id="Search">
	   	<form className="search-form" onSubmit={this.handleSearch}>
	    	<input required className="search-input" name="query" type="search"/>
	    	<button className="search-button" type="submit"><FaSearch/></button>
	    </form>

	    { this.displayResults() }
	   </div>
	  )
	}
}

let mapStateToProps = state => ({ seen_ids: state.user.seen_ids })
export default connect(mapStateToProps)(Search)
