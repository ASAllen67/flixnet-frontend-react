import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { MdErrorOutline as Err } from 'react-icons/md'
import { backend_api } from './constants'
import Login from './views/Login'
import Signup from './views/Signup'
import Navibar from './components/Navibar'
import Search from './views/Search'
import MovieTracker from './views/MovieTracker'
import './stylesheets/App.scss'

class App extends React.Component {

	state = {
		loading: true,
		connectionError: false
	}

	componentDidMount() {
		if (this.props.loggedIn) {
			fetch(`${backend_api}/users/current`, {
				headers: { Authorization: `Bearer ${localStorage.token}` }
			})
			.then(res => res.json())
			.then(res => {
				this.setState({ loading: false })
				if (res.user)
					this.props.dispatch({ type: 'SET_USER', user: res.user })
				else
					this.props.dispatch({ type: 'LOG_OUT' })
			})
			.catch(error => this.props.dispatch({ type: 'LOG_OUT' }) )
		}
		else {
			fetch(backend_api)
			.then(() => this.setState({ loading: false }))
			.catch(() => this.setState({ loading: false, connectionError: true }))
		}
	}

	loading = () => (
		<div className="loading">
			<ReactLoading type="bars" color="#E50A12" height="20%" width="20%" />
			<div>Waking up Heroku database</div>
		</div>
	)

	connectionError = () => (
		<div className="loading">
			<Err className='svg-err'/>
			<div className='err-text'>Connection error</div>
			<div className='err-text'>Please wait and try again</div>
		</div>
	)

	loggedInRoutes = ()=> (
		<div id='App'>
			<Navibar/>
			<Switch>
				<Route exact path='/search' component={Search} />
				<Route exact path='/tracker' component={MovieTracker} />
				<Redirect to='/search' />
			</Switch>
		</div>
	)

	loggedOutRoutes = () => (
		<div id='App'>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Redirect to='/login' />
			</Switch>
		</div>
	)

	render() {
		if (this.state.loading) return this.loading()
		else if (this.state.connectionError) return this.connectionError()
		else if (this.props.loggedIn) return this.loggedInRoutes()
		else return this.loggedOutRoutes()
	}
}

let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect(mapStateToProps)(App)
