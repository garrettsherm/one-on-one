/* src/components/Chat/ChatBubble/ChatBubble.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** CSS */
import './ChatBubble.css';

/** Presenational Component for ChatBubbles */
const ChatBubble = ({name, message, me}) => {

	// add class for me or opponent styling
	const addClass = me ? 'message--me' : 'message--not-me';

	// determine name to post for me or opponent
	const postName = me ? 'me' : name;

	return(
		<div className={`chat-bubble-container ${addClass}`}>
			<div className="chat-bubble__name">
				<p>{postName}</p>
			</div>
			<div className="chat-bubble-flex">
				<div className="chat-bubble__message">
					<p>
					{message}
					</p>
				</div>
			</div>
		</div>
	);
}

ChatBubble.propTypes = {
	name: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	me: PropTypes.bool
};

export default ChatBubble;
