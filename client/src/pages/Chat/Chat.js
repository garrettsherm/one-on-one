/* src/pages/Chat/Chat.js */

/** Node Modules */
import React, { Component } from 'react'
import get from 'lodash/get';
import PropTypes from 'prop-types';

/** Components */
/*** Chat Components */
import ChatApp from '../../components/Chat/ChatApp/ChatApp';

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
		newMsg: '',
		msgList: [],
		myName: 'anon',
		oppName: 'anon'
	};

	/** React lifecycle Method - Component Did Mount */
	componentDidMount(){
		// make sure user name and opponent name exist before using them
		// default to anon
		const testname = get(this.props, 'location.state.name', 'anon');
		const oppName = get(this.props, 'location.state.oppName', 'anon');

		// set name with names
		this.setState({ myName: testname, oppName: oppName });

		/** On Socket Events for page */

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

	/** React lifecycle Method - Component Will Unmount */
	componentWillUnmount(){
		// remove socket listeners to prevent memory leaks
		this.props.socket.off('new message received');
		this.props.socket.off('not in room');
		this.props.socket.off('chat over');

		// on exit component, tell web socket server user is leaving
		this.props.socket.emit('leaving chat', this.props.match.params.id);
	};

	// on send message, send message to server
	handleSendMsg = (e) => {

		e.preventDefault();

		// cannot send empty message
		if(this.state.newMsg.length < 1) {
			alert('cannot have empty message'); 
			return;
		}

		// send new message socket event to server, pass message, room id, and user name
		this.props.socket.emit('new message', 
			this.state.newMsg, 
			this.props.match.params.id, 
			this.state.myName
		);

		// update state to have include new message
		const newMsgList = [...this.state.msgList, { name: this.state.myName, msg: this.state.newMsg, me: true }];
		this.setState({msgList: newMsgList, newMsg: ''}, () => {
			// after state update scroll to botom of page
			window.scrollTo(0, document.body.scrollHeight);
		});


	};

	handleMsgChange= e => {
		this.setState({newMsg: e.target.value});		
	};

	render(){

		const chatAppProps = {
			msgList: this.state.msgList,
			oppName: this.state.oppName,
			handleSendMsg: this.handleSendMsg,
			handleMsgChange: this.handleMsgChange,
			msgValue: this.state.newMsg
		};

		return(<ChatApp {...chatAppProps} />);
	}

}

export default Chat;