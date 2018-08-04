import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


class Searching extends Component {

	state = {
		count: 0
	};

	componentDidMount(){
		console.log(this.props.location.state.name);
		this.props.socket.emit('searching for new game', this.props.location.state.name);

		this.props.socket.on('update count', (count) => {
			this.setState({count: count});
		});

		this.props.socket.on('start chat', (chatID) => {
			this.props.history.push({
				pathname: `chat/${chatID}`,
				state: { name: this.props.location.state.name }
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