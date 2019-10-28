import React from 'react'
import { connect } from 'react-redux'
import NotesModal from '../components/NotesModal'
import CompletedTable from '../components/tables/completed'
import BacklogTable from '../components/tables/backlog'
import FavoriteTable from '../components/tables/favorites'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	state = {
		entry_type: 'completed',
		hideOverview: false,
		showModal: false
	}

	getHeader = ()=> {
		let message, grammar
		let count = Object.keys(this.props.user[this.state.entry_type]).length

		if (count === 1) {
			count += ' movie'
			grammar = 'is'
		}
		else {
			count += ' movies'
			grammar = 'are'
		}

		if (this.state.entry_type === 'completed')
			message = `You have seen ${count}`
		else if (this.state.entry_type === 'backlog')
			message = `There ${grammar} ${count} in your Backlog`
		else
			message = `You have favorited ${count}`

		return <h1 className='mt-heading'>{message}</h1>
	}

	getOptions = ()=> {
		const defaultClass = 'mt-status-item'
		const activeClass = defaultClass + ' mt-active-item'
		const options = ['Completed', 'Backlog', 'Favorites']

		return (
			<div className='mt-status-options'>
			{ options.map(o =>
					<div
					key={o}
					className={this.state.entry_type === o.toLowerCase() ? activeClass : defaultClass}
					onClick={()=> this.setState({ entry_type: o.toLowerCase() }) }>
						{o}
						<span className='mt-bottom'></span>
					</div>
			)}
			</div>
		)
	}

	toggleOverview = () => this.setState({ hideOverview: !this.state.hideOverview })

	toggleModal = entry => {
		if (this.state.showModal)
			this.setState({ showModal: false })
		else {
			entry.e.id = entry.mid
			this.setState({ showModal: entry.e })
		}
	}

  getModal = () => {
  	if (this.state.showModal)
  		return <NotesModal entry={this.state.showModal} entry_type={this.state.entry_type} toggleModal={this.toggleModal}/>
	}

	getTable = ()=> {
		if (this.state.entry_type === 'completed')
			return <CompletedTable toggleModal={this.toggleModal} toggleOverview={this.toggleOverview} hideOverview={this.state.hideOverview}/>
		else if (this.state.entry_type === 'backlog')
			return <BacklogTable toggleModal={this.toggleModal} toggleOverview={this.toggleOverview} hideOverview={this.state.hideOverview}/>
		else
			return <FavoriteTable toggleModal={this.toggleModal} toggleOverview={this.toggleOverview} hideOverview={this.state.hideOverview}/>
	}

	render() {
		return (
			<div id='MovieTracker'>
				{ this.getModal() }
				{ this.getHeader() }
				{ this.getOptions() }
				{ this.getTable() }
			</div>
		)
	}
}

let mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(MovieTracker)
