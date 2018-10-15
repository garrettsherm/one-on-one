/* src/components/Chat/ChatApp/ChatApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** wrappers Components */
import Container from '../../wrappers/Container/Container';
import Row from '../../wrappers/Row/Row';
/*** commons Components */
import TitleText from '../../commons/TitleText/TitleText';
/*** Chat Components */
import ChatBubble from '../ChatBubble/ChatBubble';
import ChatInput from '../ChatInput/ChatInput';

/** CSS */
import './ChatApp.css';

/** Main Presentational component for Chat/:chatid Page*/
const SearchingApp = ({msgList, oppName, msgValue, handleSendMsg, handleMsgChange}) => {

	// Get chat messages to display
	const chatBubbles = msgList.map( (msg, i) => 
		<ChatBubble key={`chat-bubble-${i}`} name={msg.name} message={msg.msg} me={msg.me} />
	);

	return(
		<div className="chat-container">

			<Container>
				<Row>
					<TitleText titleText="One-on-One Chat" center={true} styles={{color: '#ffffff', marginTop: '20px'}} />
					<div className="col-md-12 text-center">
						<p className="chat-with-text"><i>You are in chat with:</i></p>
						<p className="chat-with-opp"><b>{oppName}</b></p>
					</div>
					<div className="chat__section col-md-8 offset-md-2">
						{ chatBubbles }
					</div>
				</Row>
			</Container>

			<div className="new__msg">
				<ChatInput handleSendMsg={handleSendMsg} handleMsgChange={handleMsgChange} msgValue={msgValue} />
			</div>

		</div>
	);
};

/** PropTypes */
SearchingApp.propTypes = {
	msgList: PropTypes.array.isRequired,
	oppName: PropTypes.string.isRequired,
	msgValue: PropTypes.string.isRequired,
	handleSendMsg: PropTypes.func.isRequired,
	handleMsgChange: PropTypes.func.isRequired
};

export default SearchingApp;