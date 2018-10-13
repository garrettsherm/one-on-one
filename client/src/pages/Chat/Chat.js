/* src/pages/Chat/Chat.js */

/** Node Modules */
import React, { Component } from 'react'
import get from 'lodash/get';
import PropTypes from 'prop-types';

/** Components */
/*** Chat Components */
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import ChatInput from '../../components/Chat/ChatInput/ChatInput';

/** CSS */
import './Chat.css';

/**
 * @name Chat
 * @class
 * @extends Component
 * @description		Page component for one-on-one Chat 		
*/
class Chat extends Component {

	/** PropTypes */
	static propTypes = {
		location: PropTypes.object.isRequired,
		socket: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired
	};

	/** Default state */
	state = {
		msgList: [],
		myName: 'anon',
		oppName: 'anon'
	};

	/**
	 *
	*/
	componentDidMount(){
		// make sure user name and opponent name exist before using them
		// default to anon
		const testname = get(this.props, 'location.state.name', 'anon');
		const oppName = get(this.props, 'location.state.oppName', 'anon');

		// set name with names
		this.setState({ myName: testname, oppName: oppName });

		// on new message received socket event, update state
		this.props.socket.on('new message received', (msg, name) => {
			const newMsgList = [...this.state.msgList, { name: name, msg: msg, me: false }];
			this.setState({msgList: newMsgList}, () => {
				window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
			});
		});

		// on not in room event, go back to home page
		// mainly used for development when cra restarts
		this.props.socket.on('not in room', () => {
			this.props.history.push('/');
		});

		// on chat over event, notify user and go to home page
		this.props.socket.on('chat over', () => {
			alert('Opponent has left');
			this.props.history.push('/');
		});

		// send check in room event to websocket server
		// if not on room, will receive not in room socket event from server
		this.props.socket.emit('check in room', this.props.match.params.id);

	};

	componentWillUnmount(){
		// remove socket listeners to prevent memory leaks
		this.props.socket.off('new message received');
		this.props.socket.off('not in room');
		this.props.socket.off('chat over');

		// on exit component, tell web socket server user is leaving
		this.props.socket.emit('leaving chat', this.props.match.params.id);
	};

	// on send message, send message to server
	handleSendMsg = message => {
		if(message.length < 1) {
			alert('cannot have empty message'); 
			return;
		}
		this.props.socket.emit('new message', 
			message, 
			this.props.match.params.id, 
			this.state.myName
		);

		const newMsgList = [...this.state.msgList, { name: this.state.myName, msg: message, me: true }];
		this.setState({msgList: newMsgList}, () => {
			window.scrollTo(0, document.body.scrollHeight);
		});


		// reset textarea to blank
		this.setState({newMsg: ''});
	};

	render(){

		const chatBubbles = this.state.msgList.map( (msg, i) => 
			<ChatBubble key={`chat-bubble-${i}`} name={msg.name} message={msg.msg} me={msg.me} />
		);

		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1><strong>One on One Chat</strong></h1>
							<p><strong>You are in chat with:</strong> {this.state.oppName}</p>
						</div>
						<div className="chat__section col-md-8 offset-md-2">
							{ chatBubbles }
						</div>
					</div>
				</div>
				<div className="new__msg">
					<ChatInput handleSendMsg={this.handleSendMsg} />
				</div>
			</div>
		);
	}

}

export default Chat;