import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import NodeRSA from 'node-rsa'
import flixnet_logo from '../images/flixnet_logo.png'
import { backend_api, public_key } from '../constants'
import '../stylesheets/prelogin.scss'


class Login extends React.Component {

	state = {
		error: null
	}

	handleLogin = e => {
		e.preventDefault()
		
		const form = e.target
		const lock = new NodeRSA(public_key)
		const credentials = {
			username: lock.encrypt(form.username.value, 'base64'),
			password: lock.encrypt(form.password.value, 'base64')
		}

		fetch(`${backend_api}/sessions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json' 
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then(res => {
			if (res.error) {
				form.password.value = ''
				this.setState({ error: res.error })
			}
			else if (res.token) {
				this.props.dispatch({ type: 'LOG_IN', token: res.token })
				this.props.dispatch({ type: 'SET_USER', user: res.user })
			}
		})
	}

	render() {
		return (
			<div id='Login' className='pl-page'>
				<img className='pl-logo' src={flixnet_logo} draggable='false' alt='FlixNet Logo' />

				<div className='pl-form-container'>
					<h1 className='pl-heading'>Log In</h1>

					{ this.state.error && <p className='login-error'>{this.state.error}</p> }

					<form className='pl-form' onSubmit={this.handleLogin}>
						<input className='pl-input top' required type='text' name='username' placeholder='Username' /><br/>
						<input className='pl-input' required type='password' name='password' placeholder='Password' />
						<button className='pl-button red-btn' type='submit'>Log In</button>
					</form>

					<Link to='/signup' className='pl-redirect'>Don't have an account yet?</Link>
				</div>
			</div>
		)
	}
}

export default connect()(Login)
