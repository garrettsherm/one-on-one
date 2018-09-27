// Node modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Page component for finding a chat
class FindChat extends Component {

	static propTypes = {
		history: PropTypes.object.isRequired
	};

	state = {
		name: ''
	};

	// find a chat on click or form enter
	handleFind = e => {
		e.preventDefault();

		//move to searching page, pass name entered
		this.props.history.push({
			pathname: '/searching',
			state: { name: this.state.name }
		});
	};

	// function to update name entered
	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12 text-center">
						<h1><strong>FindChat</strong></h1>
					</div>
					<div className="col-md-6 offset-md-3 text-center">
						<form onSubmit={this.handleFind}>
							<div className="form-group">
								<label>Enter Name</label>
								<input className="form-control" type="text" onChange={this.handleNameChange} name="name"/>
							</div>
							<button className="btn btn-primary" onClick={this.handleFind}>Find Someone</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(FindChat);