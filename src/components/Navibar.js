import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar } from 'react-bootstrap'
import flixnet_banner from '../images/flixnet_banner3.png'
import '../stylesheets/Navibar.scss'

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
      const context = this
      const args = arguments 
      clearTimeout(debounceTimer) 
      debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

const storeScroll = () => {
	console.log("storing scrollY")
  document.documentElement.dataset.scroll = window.scrollY;
}

class Navibar extends React.Component {

	componentDidMount() {
		document.addEventListener("scroll", debounce(storeScroll, 100));
		storeScroll();
	}

	render() {
		return (
	    <Navbar id="Navibar" expand="md">
	      <img className="brand" draggable="false" src={flixnet_banner} alt="banner"/>

	      <Navbar.Toggle variant="light" aria-controls="basic-navbar-nav" className="bg-dark toggle-button"/>
	      <Navbar.Collapse id="basic-navbar-nav">
					<Link to="/search" className="nav-link">
						Search
						<span className="bottom"></span>
					</Link>

					<div className="nav-link" onClick={()=> this.props.dispatch({ type: "LOG_OUT" })}>
						 Logout
						<span className="bottom"></span>
					</div>
	      </Navbar.Collapse>
	    </Navbar>
		)
	}
}

// let mapStateToProps = state => ({ loggedIn: state.session.loggedIn })
export default connect()(Navibar)