import React from 'react'
import { connect } from 'react-redux'
import CompletedTable from '../components/CompletedTable'
import BacklogTable from '../components/BacklogTable'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	state = {
		status: "completed_entries"
	}

	getHeader = ()=> {
		let message
		let count = this.props.user[this.state.status].length

		if (this.state.status === "completed_entries")
			message = `You have seen ${count} ${count === 1 ? "movie" : "movies"}`
		else if (this.state.status === "backlog_entries")
			message = `There is ${count} ${count === 1 ? "movie" : "movies"} in your Backlog`
		else
			message = `You have favorited ${count} ${count === 1 ? "movie" : "movies"}`

		return <h1 className="mt-count">{message}</h1>
	}

	getTable = ()=> {
		let movies = this.props.user[this.state.status]
		if (movies.length === 0)
			return null
		else if (this.state.status === "completed_entries")
			return <CompletedTable/>
		else if (this.state.status === "backlog_entries")
			return <BacklogTable/>
	}

	render() {
		return (
			<div id="MovieTracker">
				{ this.getHeader() }
				<div className="mt-status-options">
					<div className={this.state.status === "completed_entries" ? "mt-status-item mt-active" : "mt-status-item"} onClick={()=> this.setState({ status: "completed_entries" }) }>
						Completed
						<span className="mt-bottom"></span>
					</div>

					<div className={this.state.status === "backlog_entries" ? "mt-status-item mt-active" : "mt-status-item"} onClick={()=> this.setState({ status: "backlog_entries" }) }>
						Backlog
						<span className="mt-bottom"></span>
					</div>

					<div className={this.state.status === "favorites" ? "mt-status-item mt-active" : "mt-status-item"} onClick={()=> this.setState({ status: "favorites" }) }>
						Favorites
						<span className="mt-bottom"></span>
					</div>
				</div>

				{ this.getTable() }
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(MovieTracker)
