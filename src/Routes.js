import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './views/Login'
import Navibar from './components/Navibar'
import Search from './views/Search'
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
		<div id="Routes">
			<Navibar/>

			<Switch>
				<Route exact path='/search' component={Search} />
				<Redirect to="/search" />
			</Switch>
		</div>
	)
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect(mapStateToProps)(Routes)
