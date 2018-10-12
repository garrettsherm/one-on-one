import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChatInput.css';

class ChatInput extends Component {

	static propTypes = {
		handleSendMsg: PropTypes.func.isRequired
	};

	state = {
		newMsg: ''
	};

	handleMsgChange = (e) => {
		this.setState({newMsg: e.target.value});
	};

	handleSendMsg = () => {
		this.props.handleSendMsg(this.state.newMsg);
		this.setState({newMsg: ''});
	};

	handleEnterPress = (e) => {
		if(e.key === 'Enter'){
			this.handleSendMsg();
		}
	};

	render(){

		const inputProps = {
			type: 'text',
			onChange: this.handleMsgChange,
			className: 'new__msg__input form-control',
			name: 'newMsg',
			value: this.state.newMsg,
			onKeyPress: this.handleEnterPress
		}


		return(
			<div className="new__msg__container">
				<button onClick={this.handleSendMsg} className="btn btn-primary">Send Message</button>
				<div className="form-group">
					<input {...inputProps} />
				</div>
			</div>
		);
	}

}

export default ChatInput;
