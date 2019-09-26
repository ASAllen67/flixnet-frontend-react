import React from 'react'
import { connect } from 'react-redux'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	render() {
		return (
			<div id="MovieTracker">
				<h1 className="movie-count">You have seen {this.props.seen_ids.length} movies.</h1>
			</div>
		)
	}
}

let mapStateToProps = state => ({ seen_ids: state.user.seen_ids })
export default connect(mapStateToProps)(MovieTracker)
