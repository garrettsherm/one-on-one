/* src/pages/FindChat/FindChat.js */

/** Node modules */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Components */
/*** FindChat Components */
import FindChatApp from '../../components/FindChat/FindChatApp/FindChatApp';

/**
 * @name FindChat
 * @class
 * @extends Component
 * @description 	Logic component for FindChat Page, all calls to server for findchat page made here
*/
class FindChat extends Component {

	/** PropTypes */
	static propTypes = {
		history: PropTypes.object.isRequired
	};

	/** Default State */
	state = {
		name: localStorage.getItem("name") || ''
	};

	/*
	 * @name handleFind
	 * @function
	 * @description		Send request to server that want to find game
	*/	
	handleFind = e => {

		e.preventDefault();

		// Remember name put in for next time
		localStorage.setItem("name", this.state.name);

		//move to Searching page, pass name entered
		this.props.history.push({
			pathname: '/searching',
			state: { name: this.state.name }
		});
	};

	/*
	 * @name handleNameChange
	 * @function
	 * @description		Record name to state as entered
	*/	
	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	render(){
		
		// Props for findChatApp
		const findChatAppProps = {
			handleFind: this.handleFind,
			handleNameChange: this.handleNameChange,
			name: this.state.name
		}

		return(<FindChatApp {...findChatAppProps} />);
	}
}

export default withRouter(FindChat);