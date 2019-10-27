import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import MovieCard from '../components/MovieCard'
import SearchModal from '../components/SearchModal'
import { backend_api } from '../constants'
import '../stylesheets/Search.scss'


class Search extends React.Component {

  state = {
    showModal: false,

    query: null,

    page: 1,
    lastPage: 1,

  	results: null,
    total_results: null
  }

  // searchTMDB = (pageNum=1, query=this.state.query ) => {
  //   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${query}&language=en-US&page=${pageNum}&include_adult=false`)
  //   .then(res => res.json())
  //   .then(res => {
  //     this.setState({ 
  //       query: query,
  //       page: res.page,
  //       lastPage: res.total_pages,
  //       results: res.results,
  //       total_results: res.total_results
  //     })
  //   })
  // }

  searchTMDB = (pageNum=1, query=this.state.query ) => {
    fetch(`${backend_api}/sessions/tmdb-search?query=${query}&pageNum=${pageNum}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ 
        query: query,
        page: res.page,
        lastPage: res.total_pages,
        results: res.results,
        total_results: res.total_results
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (e.target.query.value !== this.state.query)
      this.searchTMDB(1, e.target.query.value)
  }

  renderResults = () => {
  	let results = this.state.results
    let user = this.props.user

  	if(results === null)
  		return <div className='empty-search-text'>Let's find some movies to watch!</div>
  	else if (results.length === 0)
  		return <div className='empty-search-text'>Zero results found for '{this.state.query}'</div>
  	else
  		return (
        <Fragment>
    			<div className='search-results'>
    				{ results.map(m => {

              let seen = !!user.completed[m.id]
              let backlogged = !!user.backlog[m.id]
              let favorited = !!user.favorites[m.id]

              return (
                <div key={m.id} onClick={()=> this.setState({ showModal: m }) }>
                  <MovieCard
                    movie={m} 
                    seen={seen} 
                    backlogged={backlogged} 
                    favorited={favorited}
                  />
                </div>
              )
            })}
  				</div>
          { this.renderPageButtons() }
        </Fragment>
			)
  }

  renderPageButtons = () => {
    return (
      <Fragment>
        <button
          className='results-page-button inverted-red-btn'
          disabled={this.state.page === 1}
          onClick={()=> this.searchTMDB(this.state.page - 1) }>
          Previous
        </button>

        <button
          className='results-page-button inverted-red-btn'
          disabled={this.state.page === this.state.lastPage}
          onClick={()=> this.searchTMDB(this.state.page + 1) }>
          Next
        </button>

        <div className='page-text'>
          Page {this.state.page} of {this.state.lastPage} ({this.state.total_results} results)
        </div>
      </Fragment>
    )
  }

  renderModal = () => {
    if (this.state.showModal) {
      return <SearchModal movie={this.state.showModal} closeModal={this.closeModal}/>
    }
    else
      return null
  }

  closeModal = ()=> {
    if (this.state.showModal)
      this.setState({ showModal: false })
  }

	render() {
	  return (
	   <div id='Search'>
      { this.renderModal() }

	   	<form className='search-form' onSubmit={this.handleSubmit}>
	    	<input required className='search-input' name='query' type='search' placeholder='Search'/>
	    	<button className='search-button' type='submit'><FaSearch/></button>
	    </form>

	    { this.renderResults() }
	   </div>
	  )
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(Search)
