import React from 'react'
import { connect } from 'react-redux'
import CompletedTable from '../components/CompletedTable'
import BacklogTable from '../components/BacklogTable'
import FavoriteTable from '../components/FavoriteTable'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	state = {
		status: "completed_entries"
	}

	getHeader = ()=> {
		let message, grammar
		let count = this.props.user[this.state.status].length

		if (count === 1) {
			count += " movie"
			grammar = "is"
		}
		else {
			count += " movies"
			grammar = "are"
		}

		switch(this.state.status) {
			case "backlog_entries":
				message = `There ${grammar} ${count} in your Backlog`
			break;

			case "favorites": 
				message = `You have favorited ${count}`
			break;

			default:
				message = `You have seen ${count}`
			break;
		}

		return <h1 className="mt-heading">{message}</h1>
	}

	getOptions = ()=> {
		const defaultClass = "mt-status-item"
		const activeClass = defaultClass + " mt-active-item"
		const entry_types = [
			{
				name: "Completed",
				status: "completed_entries"
			},
			{
				name: "Backlog",
				status: "backlog_entries"
			},
			{
				name: "Favorites",
				status: "favorites"
			}
		]

		return (
			<div className="mt-status-options">
			{ entry_types.map(type =>
					<div key={type.name} className={this.state.status === type.status ? activeClass : defaultClass} onClick={()=> this.setState({ status: type.status }) }>
						{type.name}
						<span className="mt-bottom"></span>
					</div>
			)}
			</div>
		)
	}

	getTable = ()=> {
		const movies = this.props.user[this.state.status]
		if (movies.length === 0)
			return null
		else if (this.state.status === "completed_entries")
			return <CompletedTable/>
		else if (this.state.status === "backlog_entries")
			return <BacklogTable/>
		else
			return <FavoriteTable/>
	}

	render() {
		return (
			<div id="MovieTracker">
				{ this.getHeader() }
				{ this.getOptions() }
				{ this.getTable() }
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(MovieTracker)
