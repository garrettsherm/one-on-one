import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FindChat extends Component {

	handleFind = e => {
		this.props.history.push('searching');
	}

	render(){
		return(
			<div>
				<h1>FindChat</h1>
				<button onClick={this.handleFind}>Find Someone</button>
			</div>
		);
	}
}

export default withRouter(FindChat);