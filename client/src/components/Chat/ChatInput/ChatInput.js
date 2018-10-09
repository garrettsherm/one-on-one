import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChatInput.css';

class ChatInput extends Component {

	static PropTypes = {
	};

	render(){

		return(
			<div className="new__msg text-center">
				<div className="form-group">
					<input type="text" rows="2" onChange={this.props.handleMsgChange} className="new__msg__input form-control" name="newMsg" value={this.state.newMsg} />
				</div>
				<button onClick={this.props.handleSendMsg} className="btn btn-primary">Send Message</button>
			</div>
		);
	}

}

export default ChatInput;
