import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from './views/Login'
import Signup from './views/Signup'
import Navibar from './components/Navibar'
import Search from './views/Search'
import MovieTracker from './views/MovieTracker'
import './stylesheets/App.scss'

class App extends React.Component {
	render() {
		if (!this.props.loggedIn) {
				return (
				<div id="App">
					<Switch>
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
						<Redirect to="/login" />
					</Switch>
				</div>
			)
		}
		else {
			return (
				<div id="App">
					<Navibar/>
					<Switch>
						<Route exact path='/search' component={Search} />
						<Route exact path='/tracker' component={MovieTracker} />
						<Redirect to="/search" />
					</Switch>
				</div>
			)
		}
	}
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect(mapStateToProps)(App)
