import React from 'react'
import { connect } from 'react-redux'
import '../stylesheets/MovieTracker.scss'

class MovieTracker extends React.Component {

	render() {
		return (
			<div id="MovieTracker">
				<div className="movie-count">You have seen {this.props.seen_ids.length} movies.</div>
			</div>
		)
	}
}

let mapStateToProps = state => ({ seen_ids: state.user.seen_ids })
export default connect(mapStateToProps)(MovieTracker)
