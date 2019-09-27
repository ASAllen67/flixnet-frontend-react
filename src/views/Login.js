import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import JSEncrypt from 'jsencrypt'
import flixnet_logo from '../images/flixnet_logo.png'
import { rails_api } from '../constants'
import '../stylesheets/prelogin.scss'


class Login extends React.Component {

	state = {
		loading: false,
		public_key: null,
		error: null
	}

	componentDidMount() {
		this.fetchPublicKey()
	}

	fetchPublicKey = () => {
		fetch(`${rails_api}/public_key`)
		.then(res => res.json())
		.then(res => {
			if (res.public_key) {
				let lock = new JSEncrypt()
				lock.setPublicKey(res.public_key)
				this.setState({ loading: false, public_key: lock })
			}
		})
		.catch(error => {
			setTimeout(this.fetchPublicKey, 5000)
			if (!this.state.loading)
				this.setState({ loading: true })
		})
	}

	handleLogin = e => {
		e.preventDefault()

		let form = e.target
		let credentials = {
			username: this.state.public_key.encrypt(form.username.value),
			password: this.state.public_key.encrypt(form.password.value),
		}

		fetch(`${rails_api}/sessions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json" 
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then(res => {
			if (res.error) {
				form.password.value = ""
				this.setState({ error: res.error })
			}
			else if (res.token) {
				localStorage.setItem("token", res.token)
				this.props.dispatch({ type: "LOG_IN" })
				this.props.dispatch({ type: "SET_USER", user: res.user })
			}
		})
	}

	render() {

		if (this.state.loading) {
			return (
				<div className="pl-loading">
					<ReactLoading type="bars" color="#E50A12" height="20%" width="20%" />
					<div>Waking up Heroku database</div>
				</div>
			)
		}

		return (
			<div id="Login" className="pl-page">
				<img className="pl-logo" src={flixnet_logo} draggable="false" alt="FlixNet Logo" />

				<div className="pl-form-container">
					<h1 className="pl-heading">Log In</h1>

					{ this.state.error && <p className="pl-error">{this.state.error}</p> }

					<form className="pl-form" onSubmit={this.handleLogin}>
						<input className="pl-input top" required type="text" name="username" placeholder="Username" /><br/>
						<input className="pl-input" required type="password" name="password" placeholder="Password" />
						<button className="pl-button red-btn" type="submit">Log In</button>
					</form>

					<Link to="/signup" className="pl-redirect">Don't have an account yet?</Link>
				</div>
			</div>
		)
	}
}

export default connect()(Login)
