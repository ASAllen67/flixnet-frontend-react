import React from 'react'
import { connect } from 'react-redux'
import CompletedTable from '../components/CompletedTable'
import BacklogTable from '../components/BacklogTable'
import FavoriteTable from '../components/FavoriteTable'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	state = {
		status: 'completed'
	}

	getHeader = ()=> {
		let message, grammar
		let count = Object.keys(this.props.user[this.state.status]).length

		if (count === 1) {
			count += ' movie'
			grammar = 'is'
		}
		else {
			count += ' movies'
			grammar = 'are'
		}

		switch(this.state.status) {
			case 'backlog':
				message = `There ${grammar} ${count} in your Backlog`
			break;

			case 'favorites': 
				message = `You have favorited ${count}`
			break;

			default:
				message = `You have seen ${count}`
			break;
		}

		return <h1 className='mt-heading'>{message}</h1>
	}

	getOptions = ()=> {
		const defaultClass = 'mt-status-item'
		const activeClass = defaultClass + ' mt-active-item'
		const options = ['Completed', 'Backlog', 'Favorites']

		return (
			<div className='mt-status-options'>
			{ options.map(o =>
					<div key={o} className={this.state.status === o.toLowerCase() ? activeClass : defaultClass} onClick={()=> this.setState({ status: o.toLowerCase() }) }>
						{o}
						<span className='mt-bottom'></span>
					</div>
			)}
			</div>
		)
	}

	getTable = ()=> {
		const movies = this.props.user[this.state.status]
		if (movies.length === 0)
			return null
		else if (this.state.status === 'completed')
			return <CompletedTable/>
		else if (this.state.status === 'backlog')
			return <BacklogTable/>
		else
			return <FavoriteTable/>
	}

	render() {
		return (
			<div id='MovieTracker'>
				{ this.getHeader() }
				{ this.getOptions() }
				{ this.getTable() }
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(MovieTracker)
