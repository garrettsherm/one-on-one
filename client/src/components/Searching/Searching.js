// Node modules
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import get from 'lodash/get'

// page component for searching for a game
class Searching extends Component {

	state = {
		count: 0
	};

	componentDidMount(){
		// make sure name was passed before using it
		// default to anon
		const testname = get(this.props, 'location.state.name', 'anon');

		// on update count event, update state
		this.props.socket.on('update count', (count) => {
			this.setState({count: count});
		});

		// on start chat event, move to chat page
		this.props.socket.on('start chat', (chatID, oppName) => {
			// pass user name and opponent name
			this.props.history.push({
				pathname: `chat/${chatID}`,
				state: { name: testname, oppName: oppName }
			});
		});

		// send searching for new game event to websocket server
		this.props.socket.emit('searching for new game', testname);
	}

	componentWillUnmount(){
		// remove socket events for component to prevent memory leaks
		this.props.socket.off('update count');
		this.props.socket.off('start chat');

		// send leaving search event to websocket server
		this.props.socket.emit('leaving search');
	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 text-center">
						<h1><strong>Searching for a game</strong></h1>
						<p><strong>{this.state.count}</strong> person searching for chat</p>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Searching);