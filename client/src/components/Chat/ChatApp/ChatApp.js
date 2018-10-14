/* src/components/Chat/ChatApp/ChatApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** Chat Components */
import ChatBubble from '../ChatBubble/ChatBubble';
import ChatInput from '../ChatInput/ChatInput';

/** CSS */
import './ChatApp.css';

/** Main Presentational component for Chat/:chatid Page*/
const SearchingApp = ({msgList, oppName, handleSendMsg}) => {

	const chatBubbles = msgList.map( (msg, i) => 
		<ChatBubble key={`chat-bubble-${i}`} name={msg.name} message={msg.msg} me={msg.me} />
	);

	return(
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12 text-center">
						<h1><strong>One on One Chat</strong></h1>
						<p><strong>You are in chat with:</strong> {oppName}</p>
					</div>
					<div className="chat__section col-md-8 offset-md-2">
						{ chatBubbles }
					</div>
				</div>
			</div>
			<div className="new__msg">
				<ChatInput handleSendMsg={handleSendMsg} />
			</div>
		</div>
	);
};

/** PropTypes */
SearchingApp.propTypes = {
	msgList: PropTypes.array.isRequired,
	oppName: PropTypes.string.isRequired,
	handleSendMsg: PropTypes.func.isRequired
};

export default SearchingApp;