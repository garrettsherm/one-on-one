import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChatBubble.css';

class ChatBubble extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		me: PropTypes.bool
	};

	render(){

		const addClass = this.props.me ? 'message--me' : 'message--not-me';

		const postName = this.props.me ? 'me' : this.props.name;

		return(
			<div className={`chat-bubble-container ${addClass}`}>
				<div className="chat-bubble__name">
					{postName}
				</div>
				<div className="chat-bubble__message">
					<p>
					{this.props.message}
					</p>
				</div>
			</div>
		);
	}

}

export default ChatBubble;
