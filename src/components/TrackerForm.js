import React from 'react'
import { connect } from 'react-redux'
import { IoIosArrowForward } from 'react-icons/io'
import { rails_api } from '../constants'
import '../stylesheets/TrackerForm.scss'


class TrackerForm extends React.Component {

	state = {
		hidden: true,

		status: "",

		hideScore: true,
		score: "",

		hideSubmit: true
	}
	baseState = this.state

	componentDidUpdate() {
	  this.bottom.scrollIntoView({ behavior: "smooth" })
	}

	toggleTrackerForm = ()=> {
		if (this.state.hidden)
			this.setState({ hidden: false })
		else
			this.setState(this.baseState)
	}

	checkStatus = e => {
		let status = e.target
		let hideScore = true
		let hideSubmit = true

		if (status.value === "Completed")
			hideScore = false
		else if (status.value)
			hideSubmit = false
		
		this.setState({ status: status.value, hideScore, hideSubmit })
	}

	checkScore = e => {
		if (e.target.value)
			this.setState({ score: e.target.value, hideSubmit: false })
	}

	handleSubmit = e => {
		e.preventDefault()

		let form = e.target
		let m = this.props.movie

		let entry = {
			title: m.title,
			overview: m.overview,
			poster_path: m.poster_path,
			score: form.score.value,
			tmdb_id: m.id
		}

		let url = rails_api
		let type

		if (this.state.status === "Completed") {
			url += "/completed_entries"
			type = "ADD_COMPLETED_ENTRY"
		}
		else {
			url += "/backlog_entries"
			type = "ADD_BACKLOG_ENTRY"
		}

		fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.token}`,
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ entry })
		})
		.then(res => res.json())
		.then(res => {
			if (res.entry) {
				this.props.dispatch({ type, entry: res.entry })
			}
		})
	}

	render() {
		return (
			<div className="tf-container">
				<button className={this.state.hidden ? "tf-toggle red-btn" : "tf-toggle inverted-red-btn"} onClick={this.toggleTrackerForm}>{this.state.hidden ? "Add to my Tracker" : "Cancel"}</button>

				<form className="tracker-form" hidden={this.state.hidden} onSubmit={this.handleSubmit}>
					<div className="tf-item-container">
						&nbsp;<IoIosArrowForward/>&nbsp;
						<select name="status" className="tf-select" value={this.state.status} onChange={this.checkStatus} required>
							<option disabled value="">Choose a status</option>
							<option>Completed</option>
							<option>Plan to Watch</option>
						</select>
					</div>

					<div className="tf-item-container" hidden={this.state.hideScore}>
						&nbsp;<IoIosArrowForward/>&nbsp;
						<select name="score" className="tf-select" value={this.state.score} onChange={this.checkScore} required={!this.state.hideScore}>
							<option disabled value="">Choose a score</option>
							<option value="5">5 - Masterpiece</option>
							<option value="4">4 - Great</option>
							<option value="3">3 - Average</option>
							<option value="2">2 - Mediocre</option>
							<option value="1">1 - Appalling</option>
							<option value="0">No score</option>
						</select>
					</div>

					<div className="tf-item-container" hidden={this.state.hideSubmit}>
						&nbsp;<IoIosArrowForward/>&nbsp;
						<button className="tf-submit red-btn" type="submit">Add</button>
					</div>
				</form>

				<div ref={here => this.bottom = here}></div>
			</div>
		)
	}
}

export default connect()(TrackerForm)
