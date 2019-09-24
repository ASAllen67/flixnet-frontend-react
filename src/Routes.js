import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './views/Login'
import Navibar from './components/Navibar'
import Search from './views/Search'
import MovieTracker from './views/MovieTracker'
// {/**/}


function Routes(props) {
	if (!props.loggedIn) {
		return (
			<Fragment>
				<Redirect to="/login" />
				<Login/>
			</Fragment>
		)
	}
	return (
		<Fragment>
			<Navibar/>
			
			<div id="Routes">
				<Switch>
					<Route exact path='/search' component={Search} />
					<Route exact path='/tracker' component={MovieTracker} />
					<Redirect to="/search" />
				</Switch>
			</div>
		</Fragment>
	)
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect(mapStateToProps)(Routes)
