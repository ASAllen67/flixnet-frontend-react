import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import JSEncrypt from 'jsencrypt'
import flixnet_logo from '../images/flixnet_logo.png'
import { rails_api } from '../constants'
import '../stylesheets/prelogin.scss'


class Signup extends React.Component {

	state = {
		public_key: null,
		errors: null
	}

	componentDidMount() {
		// this.fetchPublicKey()
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

	handleSignup = e => {
		e.preventDefault()

		let form = e.target

		if (form.password.value !== form.confirm_password.value) {
			this.setState({ errors: ["Passwords must match."] })
		}
		else {
			let newUser = {
				username: this.state.public_key.encrypt(form.username.value),
				password: this.state.public_key.encrypt(form.password.value)
			}
		}

		// fetch(`${rails_api}/login`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json" 
		// 	},
		// 	body: JSON.stringify(credentials)
		// })
		// .then(res => res.json())
		// .then(res => {
		// 	if (res.error) {
		// 		this.setState({ error: res.error })
		// 	}
		// 	else if (res.token) {
		// 		localStorage.setItem("token", res.token)
		// 		this.props.dispatch({ type: "LOG_IN" })
		// 	}
		// })
	}

	render() {
		
		// if (!this.state.public_key) {
		// 	return (
		// 		<div className="pl-loading">
		// 			<ReactLoading type="bars" color="#E50A12" height="20%" width="20%" />
		// 			<div>Waking up Heroku database</div>
		// 		</div>
		// 	)
		// }

		return (
			<div id="Signup" className="pl-page">
				<img className="pl-logo" src={flixnet_logo} draggable="false" alt="FlixNet Logo" />

				<div className="pl-form-container">
					<h1 className="pl-heading">Sign Up</h1>

					<form className="pl-form" onSubmit={this.handleSignup}>
						<input className="pl-input top" required type="text" name="username" placeholder="Username" /><br/>
						<input className="pl-input" required type="password" name="password" placeholder="Password" /><br/>
						<input className="pl-input" required type="password" name="confirm_password" placeholder="Confirm password" /><br/>
						<button className="pl-button red-btn" type="submit">Sign Up</button>
					</form>

					<Link to="/login" className="pl-redirect-text">Already have an account?</Link>
				</div>
			</div>
		)
	}
}

export default connect()(Signup)
