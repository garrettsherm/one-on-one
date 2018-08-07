import React, { Component } from 'react'
import './Chat.css';
import get from 'lodash/get';

class Chat extends Component {

	state = {
		newMsg: '',
		msgList: [],
		myName: 'anon',
		oppName: 'anon'
	};

	componentDidMount(){

		const testname = get(this.props, 'location.state.name', 'anon');
		const oppName = get(this.props, 'location.state.oppName', 'anon');

		this.setState({ myName: testname, oppName: oppName });

		this.props.socket.on('new message received', (msg, name) => {
			const newMsgList = [...this.state.msgList, { name: name, msg: msg }];
			this.setState({msgList: newMsgList});
			window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
		});

		this.props.socket.on('not in room', () => {
			this.props.history.push('/');
		});

		this.props.socket.emit('check in room', this.props.match.params.id);

	};

	componentWillUnmount(){
		this.props.socket.off('new message received');
		this.props.socket.emit('leaving chat', this.props.match.params.id);
	};

	handleMsgChange = (e) => {
		e.preventDefault();
		this.setState({newMsg: e.target.value});
	};

	handleSendMsg = () => {
		this.props.socket.emit('new message', 
			this.state.newMsg, 
			this.props.match.params.id, 
			this.state.myName
		);
		this.setState({newMsg: ''});
	};

	render(){
		return(
			<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12 text-center">
						<h1><strong>One on One Chat</strong></h1>
						<p>You are in chat with: <strong>{this.state.oppName}</strong></p>
					</div>
					<div className="chat__section col-md-8 offset-md-2">
						{
							this.state.msgList.map( (msg, i) => 
								<p key={`msgList${i}`}><span><strong>{msg.name}: </strong></span>{msg.msg}</p>
							)
						}
					</div>
				</div>
			</div>
			<div className="new__msg text-center">
				<div className="form-group">
					<textarea rows="2" onChange={this.handleMsgChange} className="new__msg__input form-control" name="newMsg" value={this.state.newMsg} />
				</div>
				<button onClick={this.handleSendMsg} className="btn btn-primary">Send Message</button>
			</div>
			</div>
		);
	}

}

export default Chat;