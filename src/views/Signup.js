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
		loading: false,
		public_key: null,
		errors: null
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

	handleSignup = e => {
		e.preventDefault()

		let form = e.target
		let credentials = {
			username: this.state.public_key.encrypt(form.username.value),
			password: this.state.public_key.encrypt(form.password.value),
			confirm_password: this.state.public_key.encrypt(form.confirm_password.value),
		}

		fetch(`${rails_api}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json" 
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then(res => {
			if (res.errors) {
				form.password.value = ""
				form.confirm_password.value = ""
				this.setState({ errors: res.errors })
			}
			else if (res.token) {
				localStorage.setItem("token", res.token)
				this.props.dispatch({ type: "LOG_IN" })
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
			<div id="Signup" className="pl-page">
				<img className="pl-logo" src={flixnet_logo} draggable="false" alt="FlixNet Logo" />

				<div className="pl-form-container">
					<h1 className="pl-heading">Sign Up</h1>

					{ this.state.errors && this.state.errors.map( (e, index) => <p className="pl-error" key={index}>{e}</p> )}

					<form className="pl-form" onSubmit={this.handleSignup}>
						<input className="pl-input top" required type="text" name="username" placeholder="Username" /><br/>
						<input className="pl-input" required type="password" name="password" placeholder="Password" /><br/>
						<input className="pl-input" required type="password" name="confirm_password" placeholder="Confirm password" /><br/>
						<button className="pl-button red-btn" type="submit">Sign Up</button>
					</form>

					<Link to="/login" className="pl-redirect">Already have an account?</Link>
				</div>
			</div>
		)
	}
}

export default connect()(Signup)
