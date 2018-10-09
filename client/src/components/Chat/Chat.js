// Node Modules
import React, { Component } from 'react'
import get from 'lodash/get';
import PropTypes from 'prop-types';

// Components
import ChatBubble from './ChatBubble/ChatBubble';

// CSS
import './Chat.css';

// Page component for chat room page
class Chat extends Component {

	static propTypes = {
		location: PropTypes.object.isRequired,
		socket: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired
	};

	state = {
		newMsg: '',
		msgList: [],
		myName: 'anon',
		oppName: 'anon'
	};

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
			this.setState({msgList: newMsgList});

			// scroll to bottom of page for readability
			window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
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

	// on changing textarea, update newMsg in state
	handleMsgChange = (e) => {
		this.setState({newMsg: e.target.value});
	};

	// on send message, send message to server
	handleSendMsg = () => {
		if(this.state.newMsg.length < 1) {
			alert('cannot have empty message'); 
			return;
	}
		this.props.socket.emit('new message', 
			this.state.newMsg, 
			this.props.match.params.id, 
			this.state.myName
		);

		const newMsgList = [...this.state.msgList, { name: this.state.myName, msg: this.state.newMsg, me: true }];
		this.setState({msgList: newMsgList});
		window.scrollTo(0, document.body.scrollHeight);


		// reset textarea to blank
		this.setState({newMsg: ''});
	};

	render(){
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1><strong>One on One Chat</strong></h1>
							<p><strong>You are in chat with:</strong> {this.state.oppName}</p>
						</div>
						<div className="chat__section col-md-8 offset-md-2">
							{
								this.state.msgList.map( (msg, i) => 
									<ChatBubble name={msg.name} message={msg.msg} me={msg.me} />
								)
							}
						</div>
					</div>
				</div>
				<div className="new__msg text-center">
					<button onClick={this.handleSendMsg} className="btn btn-primary">Send Message</button>
					<div className="form-group">
						<input type="text" rows="2" onChange={this.handleMsgChange} className="new__msg__input form-control" name="newMsg" value={this.state.newMsg} />
					</div>
				</div>
			</div>
		);
	}

}

export default Chat;