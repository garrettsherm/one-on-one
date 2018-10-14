/* src/pages/Searching/Searching.js */

/** Node modules */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get'

/** Components */
/** Searching Components */
import SearchingApp from '../../components/Searching/SearchingApp/SearchingApp';

/**
 * @name Searching
 * @class
 * @extends Component
 * @description 	Logic component for Searching Page, all calls to server for searching page made here
*/
class Searching extends Component {

	/** PropTypes */
	static defaultProps = {
		history: PropTypes.object.isRequired,
		socket: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	/** Default State */
	state = {
		count: 0
	};

	/** React lifecycle Method - Component Did Mount */
	componentDidMount(){

		// make sure name was passed before using it
		// default to anon
		const testname = get(this.props, 'location.state.name', 'anon');

		/** On Socket Events for page */

		// on update count socket event, update state
		this.props.socket.on('update count', (count) => {
			this.setState({count: count});
		});

		// on start chat socket event, move to chat page
		this.props.socket.on('start chat', (chatID, oppName) => {
			// move to chat page
			// pass user name and opponent name to next router page
			this.props.history.push({
				pathname: `chat/${chatID}`,
				state: { name: testname, oppName: oppName }
			});
		});

		// send searching for new game event to websocket server, pass user name
		this.props.socket.emit('searching for new game', testname);
	}

	/** React lifecycle Method - Component Will Unmount */
	componentWillUnmount(){
		// remove socket events for component to prevent memory leaks
		this.props.socket.off('update count');
		this.props.socket.off('start chat');

		// send leaving search event to websocket server
		this.props.socket.emit('leaving search');
	}

	render(){
		return(<SearchingApp count={this.state.count} />);
	}
}

export default withRouter(Searching);