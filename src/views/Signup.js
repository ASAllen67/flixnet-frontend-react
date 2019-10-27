import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NodeRSA from 'node-rsa'
import flixnet_logo from '../images/flixnet_logo.png'
import { backend_api, public_key } from '../constants'
import '../stylesheets/prelogin.scss'


class Signup extends React.Component {

	state = {
		errors: null
	}

	handleSignup = e => {
		e.preventDefault()

		const form = e.target
		const lock = new NodeRSA(public_key)
		let credentials = {
			username: lock.encrypt(form.username.value, 'base64'),
			password: lock.encrypt(form.password.value, 'base64'),
			confirm_password: lock.encrypt(form.confirm_password.value, 'base64'),
		}

		fetch(`${backend_api}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json' 
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then(res => {
			if (res.errors) {
				form.password.value = ''
				form.confirm_password.value = ''
				this.setState({ errors: res.errors })
			}
			else if (res.token) {
				this.props.dispatch({ type: 'LOG_IN', token: res.token })
				this.props.dispatch({ type: 'SET_USER', user: res.user })
			}
		})
	}

	render() {
		return (
			<div id='Signup' className='pl-page'>
				<img className='pl-logo' src={flixnet_logo} draggable='false' alt='FlixNet Logo' />

				<div className='pl-form-container'>
					<h1 className='pl-heading'>Sign Up</h1>

					{ this.state.errors && this.state.errors.map( (e, index) => <p className='signup-error' key={index}>{e}</p> )}

					<form className='pl-form' onSubmit={this.handleSignup}>
						<input className='pl-input top' required type='text' name='username' placeholder='Username' /><br/>
						<input className='pl-input' required type='password' name='password' placeholder='Password' /><br/>
						<input className='pl-input' required type='password' name='confirm_password' placeholder='Confirm password' /><br/>
						<button className='pl-button red-btn' type='submit'>Sign Up</button>
					</form>

					<Link to='/login' className='pl-redirect'>Already have an account?</Link>
				</div>
			</div>
		)
	}
}

export default connect()(Signup)
