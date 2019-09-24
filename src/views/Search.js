import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { tmdb_key } from '../keys'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import '../stylesheets/Search.scss'


class Search extends React.Component {

  state = {
    query: null,
    page: 1,
    lastPage: 1,
  	results: null,
    showModal: false
  }

  searchTMDB = (pageNum=1, query=this.state.query ) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${query}&language=en-US&page=${pageNum}&include_adult=false`)
    .then(res => res.json())
    .then(res => {
      this.setState({ 
        query: query,
        page: res.page,
        lastPage: res.total_pages,
        results: res.results
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.searchTMDB(1, e.target.query.value)
  }

  renderResults = ()=> {
  	let results = this.state.results

  	if(results === null)
  		return <div className="empty-search-text">Let's find some movies to watch!</div>
  	else if (results.length === 0)
  		return <div className="empty-search-text">Zero results found for "{this.state.query}"</div>
  	else
  		return (
        <Fragment>
    			<div className="search-results">
    				{ results.map(m => 
              <div key={m.id} onClick={()=> this.setState({showModal: m}) }>
                <MovieCard movie={m}/>
              </div>
            )}
  				</div>

          <button
            className="results-page-button"
            disabled={this.state.page === 1}
            onClick={()=> this.searchTMDB(this.state.page - 1) }>
            Previous
          </button>

          <button
            className="results-page-button"
            disabled={this.state.page === this.state.lastPage}
            onClick={()=> this.searchTMDB(this.state.page + 1) }>
            Next
          </button>

          <div className="page-text">Page {this.state.page} of {this.state.lastPage}</div>
        </Fragment>
			)
  }

  closeModal = ()=> {
    if (this.state.showModal)
      this.setState({ showModal: false })
  }

	render() {
	  return (
	   <div id="Search">
      { this.state.showModal && <MovieModal movie={this.state.showModal} closeModal={this.closeModal}/> }

	   	<form className="search-form" onSubmit={this.handleSubmit}>
	    	<input required className="search-input" name="query" type="search"/>
	    	<button className="search-button" type="submit"><FaSearch/></button>
	    </form>

	    { this.renderResults() }
	   </div>
	  )
	}
}

let mapStateToProps = state => ({ seen_ids: state.user.seen_ids, backlog_ids: state.user.backlog_ids })
export default connect(mapStateToProps)(Search)
