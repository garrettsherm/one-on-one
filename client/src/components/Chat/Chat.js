import React, { Component } from 'react'
import './Chat.css';
import get from 'lodash/get';

class Chat extends Component {

	state = {
		newMsg: '',
		msgList: [],
		myName: 'anon'
	};

	componentDidMount(){

		const testname = get(this.props, 'location.state.name', 'anon');

		this.setState({ myName: testname });

		this.props.socket.on('new message received', (msg, name) => {
			const newMsgList = [...this.state.msgList, { name: name, msg: msg }];
			this.setState({msgList: newMsgList});
		});
	};

	componentWillUnmount(){
		this.props.socket.off('new message received');
		this.props.socket.emit('leaving chat', this.props.match.params.id);
	};

	handleMsgChange = (e) => {
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
			<div className="container">
				<div className="row">
					<div className="chat__section col-md-12">
						<h2>You are in chat: {this.props.match.params.id}</h2>
						{
							this.state.msgList.map( (msg, i) => 
								<p key={`msgList${i}`}><span><strong>{i + 1} - {msg.name}: </strong></span>{msg.msg}</p>
							)
						}
					</div>
					<div className="col-md-12 new__msg">
						<textarea onChange={this.handleMsgChange} className="new__msg__input" name="newMsg" value={this.state.newMsg} />
						<button onClick={this.handleSendMsg}>Send Message</button>
					</div>
				</div>
			</div>
		);
	}

}

export default Chat;