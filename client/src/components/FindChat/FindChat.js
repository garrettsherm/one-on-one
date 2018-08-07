import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FindChat extends Component {

	state = {
		name: ''
	};

	handleFind = e => {
		e.preventDefault();
		this.props.history.push({
			pathname: '/searching',
			state: { name: this.state.name }
		});
	};

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
							<div class="form-group">
								<label for="name">Enter Name</label>
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