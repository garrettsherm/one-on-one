import React, { Component } from 'react'
import './Chat.css';

class Chat extends Component {

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="chat__section col-md-12">
						<h2>You are in chat: {this.props.match.params.id}</h2>
					</div>
					<div className="col-md-12 new__msg">
						<textarea className="new__msg__input" name="newMsg" />
					</div>
				</div>
			</div>
		);
	}

}

export default Chat;