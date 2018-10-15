/* src/components/Chat/ChatInput/ChatInput.js */

/** Node Modules */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** buttons Components */
import MainButton from '../../buttons/MainButton/MainButton';

/** CSS */
import './ChatInput.css';


class ChatInput extends Component {

	static propTypes = {
		handleSendMsg: PropTypes.func.isRequired,
		handleMsgChange: PropTypes.func.isRequired,
		msgValue: PropTypes.string.isRequired
	};

	render(){

		const inputProps = {
			type: 'text',
			onChange: this.props.handleMsgChange,
			className: 'new__msg__input form-control',
			name: 'newMsg',
			value: this.props.msgValue
		}


		return(
			<form onSubmit={ (e) => this.props.handleSendMsg(e) } className='new__msg__container'>
				<MainButton onClick={ (e) => this.props.handleSendMsg(e) } buttonText="Send Message" />
				<div className="form-group">
					<input {...inputProps} />
				</div>
			</form>
		);
	}

}

export default ChatInput;
