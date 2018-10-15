/* src/components/Chat/ChatInput/ChatInput.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** buttons Components */
import MainButton from '../../buttons/MainButton/MainButton';

/** CSS */
import './ChatInput.css';

/** Presentational component for chat input + button*/
const ChatInput = ({handleSendMsg, handleMsgChange, msgValue}) => {

	// props for input
	const inputProps = {
		type: 'text',
		onChange: handleMsgChange,
		className: 'new__msg__input form-control',
		name: 'newMsg',
		value: msgValue
	};

	return(
		<form onSubmit={ (e) => this.props.handleSendMsg(e) } className='new__msg__container'>
			<MainButton onClick={ (e) => this.props.handleSendMsg(e) } buttonText="Send Message" />
			<div className="form-group">
				<input {...inputProps} />
			</div>
		</form>
	);
}

/** PropTypes */
ChatInput.propTypes = {
	handleSendMsg: PropTypes.func.isRequired,
	handleMsgChange: PropTypes.func.isRequired,
	msgValue: PropTypes.string.isRequired
};

export default ChatInput;
