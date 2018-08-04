import React, { Component } from 'react'

class Searching extends Component {

	state = {
		count: 0,
		test: 0
	}

	componentDidMount(){
		this._isMounted = true;
		this.setState({test: this.state.test + 1})
		this.props.socket.emit('searching for new game');

		this.props.socket.on('update count', (count) => {
			this.setState({count: count});
		});

		this.props.socket.on('start chat', (chatID) => {
			this.props.history.push(`chat/${chatID}`);
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

export default Searching;