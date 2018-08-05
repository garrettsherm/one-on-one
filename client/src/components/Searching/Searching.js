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

		this.props.socket.on('start chat', (chatID) => {
			this.props.history.push({
				pathname: `chat/${chatID}`,
				state: { name: testname }
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
			<div>{this.state.count}searching</div>
		);
	}
}

export default withRouter(Searching);