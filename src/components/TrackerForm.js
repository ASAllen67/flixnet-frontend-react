import React from 'react'
import { connect } from 'react-redux'
import { IoIosArrowForward } from 'react-icons/io'
import { create_entry } from '../actions/entries'
import '../stylesheets/TrackerForm.scss'


class TrackerForm extends React.Component {

	state = {
		hidden: true,

		entry_type: '',

		hideScore: true,
		score: '',

		hideSubmit: true
	}
	baseState = this.state

	componentDidUpdate() {
	  this.bottom.scrollIntoView({ behavior: 'smooth' })
	}

	toggleTrackerForm = () => {
		if (this.state.hidden)
			this.setState({ hidden: false })
		else
			this.setState(this.baseState)
	}

	checkStatus = e => {
		const entry_type = e.target.value

		if (entry_type === 'completed')
			this.setState({ entry_type, hideScore: false, hideSubmit: true  })
		else
			this.setState({ entry_type, hideScore: true, score: '', hideSubmit: false })
	}

	checkScore = e => this.setState({ score: e.target.value, hideSubmit: false })

	handleSubmit = e => {
		e.preventDefault()

		let entry = this.props.movie
		entry.score = this.state.score

		create_entry(entry.id, entry, this.state.entry_type, this.props.dispatch)
	}

	render() {
		return (
			<div className='tf-container'>
				<button className={this.state.hidden ? 'tf-toggle red-btn' : 'tf-toggle inverted-red-btn'} onClick={this.toggleTrackerForm}>{this.state.hidden ? 'Add to my Tracker' : 'Cancel'}</button>

				<form className='tracker-form' hidden={this.state.hidden} onSubmit={this.handleSubmit}>
					<div className='tf-item-container'>
						&nbsp;<IoIosArrowForward/>&nbsp;
						<select name='entry_type' className='tf-select' value={this.state.entry_type} onChange={this.checkStatus} required>
							<option disabled value=''>Choose a status</option>
							<option value='completed'>Completed</option>
							<option value='backlog'>Plan to Watch</option>
						</select>
					</div>

					<div className='tf-item-container' hidden={this.state.hideScore}>
						&nbsp;<IoIosArrowForward/>&nbsp;
						<select name='score' className='tf-select' value={this.state.score} onChange={this.checkScore} required={!this.state.hideScore}>
							<option disabled value=''>Choose a score</option>
							<option value='5'>5 - Masterpiece</option>
							<option value='4'>4 - Great</option>
							<option value='3'>3 - Average</option>
							<option value='2'>2 - Mediocre</option>
							<option value='1'>1 - Appalling</option>
							<option value='0'>No score</option>
						</select>
					</div>

					<div className='tf-item-container' hidden={this.state.hideSubmit}>
						&nbsp;<IoIosArrowForward/>&nbsp;
						<button className='tf-submit red-btn' type='submit'>Add</button>
					</div>
				</form>

				<div ref={here => this.bottom = here}></div>
			</div>
		)
	}
}

export default connect()(TrackerForm)
