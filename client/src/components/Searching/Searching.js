import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import get from 'lodash/get'

class Searching extends Component {

	state = {
		count: 0
	};

	componentDidMount(){
		const testname = get(this.props, 'location.state.name', 'anon');
		this.props.socket.emit('searching for new game', testname);
		this.props.socket.on('update count', (count) => {
			this.setState({count: count});
		});

		this.props.socket.on('start chat', (chatID, oppName) => {
			this.props.history.push({
				pathname: `chat/${chatID}`,
				state: { name: testname, oppName: oppName }
			});
		});
	}

	componentWillUnmount(){
		this.setState({mounted: false});
		this.props.socket.off('update count');
		this.props.socket.off('start chat');
		this.props.socket.emit('leaving search');
	}

	render(){

		return(
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3 text-center">
						<h1><strong>Searching for a game</strong></h1>
						<strong>{this.state.count}</strong> person searching for chat
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Searching);