import React from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import JSEncrypt from 'jsencrypt'
import flixnet_banner from '../images/flixnet_banner2.jpeg'
import { rails_api } from '../constants'
import '../stylesheets/Login.scss'


class Login extends React.Component {

	state = {
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
				this.setState({ public_key: lock })
			}
		})
		.catch(error => setTimeout(this.fetchPublicKey, 5000))
	}

	handleLogin = e => {
		e.preventDefault()
		let credentials = {
			username: this.state.public_key.encrypt(e.target.username.value),
			password: this.state.public_key.encrypt(e.target.password.value),
		}

		fetch(`${rails_api}/login`, {
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
				this.setState({ error: res.error })
			}
			else if (res.token) {
				localStorage.setItem("token", res.token)
				this.props.dispatch({ type: "LOG_IN" })
			}
		})
	}

	render() {
		
		if (!this.state.public_key) {
			return (
				<div className="login-loading">
					<ReactLoading type="bars" color="#E50A12" height="20%" width="20%" />
					<div>Waking up Heroku database</div>
				</div>
			)
		}

		return (
			<div id="Login">
				<img draggable="false" className="login-banner" src={flixnet_banner} alt="banner" />
				{ this.state.error && <div className="login-error">{this.state.error}</div> }
				<form className="login-form" onSubmit={this.handleLogin}>
					<input className="login-input top" required type="text" name="username" placeholder="Username" />
					<br/>
					<input className="login-input" required type="password" name="password" placeholder="Password" />
					<br/>
					<button className="login-button" type="submit">Sign In</button>
				</form>
			</div>
		)
	}
}

export default connect()(Login)
