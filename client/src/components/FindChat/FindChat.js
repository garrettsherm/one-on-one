import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FindChat extends Component {

	state = {
		name: ''
	};

	handleFind = e => {
		this.props.history.push({
			pathname: '/searching',
			state: { name: this.state.name }
		});
	}

	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	render(){
		return(
			<div>
				<h1>FindChat</h1>
				<label>Enter Name</label>
				<input type="text" onChange={this.handleNameChange} />
				<br/>
				<button onClick={this.handleFind}>Find Someone</button>
			</div>
		);
	}
}

export default withRouter(FindChat);