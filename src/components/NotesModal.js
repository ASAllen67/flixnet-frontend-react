import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { update_entry } from '../actions/entries'
import '../stylesheets/NotesModal.scss'


class NotesModal extends React.Component {

	componentDidMount() {
		document.body.style.overflow = 'hidden'   
	}

	componentWillUnmount() {
		document.body.style.overflow = 'unset'
	}

	getScoreInput = () => {
		if (this.props.entry_type === 'completed' || this.props.entry_type === 'favorites')
			return (
				<span className='nm-select-container'><strong>Score:</strong>&nbsp;
					<select className='nm-select' name='score' defaultValue={this.props.entry.score}>
						<option disabled >Choose a score</option>
						<option value='5'>5 - Masterpiece</option>
						<option value='4'>4 - Great</option>
						<option value='3'>3 - Average</option>
						<option value='2'>2 - Mediocre</option>
						<option value='1'>1 - Appalling</option>
						<option value='0'>No score</option>
					</select>
				</span>
			)
	}

	handleSubmit = e => {
		e.preventDefault()

		let { entry } = this.props
		const { entry_type } = this.props
		const form = e.target

		if (entry_type === 'completed' || entry_type === 'favorites') {
			entry.score = form.score.value
		}
		entry.notes = form.notes.value

		update_entry(entry.id, entry, entry_type, this.props.dispatch)
		this.props.toggleModal()
	}

	render() {
		const e = this.props.entry
		return (
			<Modal className='modal-container' isOpen={true}>
				<div className='notes-modal'>
					<h3 className='nm-heading'>{e.title}</h3>
					<form className='nm-form' onSubmit={this.handleSubmit}>
						<div>
							<div className='nm-inputs-container'>
								{ this.getScoreInput() }
								<textarea className='nm-notes' name='notes' defaultValue={e.notes} placeholder='You can write notes about this movie here'/>
							</div>
						</div>
						<button className='nm-btn inverted-red-btn' type='button' onClick={this.props.toggleModal}>Cancel</button>
						<button className='nm-btn red-btn' type='submit'>Update</button>
					</form>
				</div>
			</Modal>
		)
	}
}

export default connect()(NotesModal)
