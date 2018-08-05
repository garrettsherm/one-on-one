import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import App from '../App';
import FindChat from '../FindChat';
import Searching from '../Searching';
import NotFound from '../NotFound';
import Chat from '../Chat';



class Router extends Component {

	socket = io.connect('http://localhost:3001');

	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={ (props) => { 
						return <FindChat socket={this.socket} {...props} /> 
					}} />
					<Route exact path="/searching" render={ (props) => { 
						return <Searching socket={this.socket} {...props} /> 
					}} />
					<Route exact path="/app" render={ (props) => {
						return <App socket={this.socket} {...props} />
					}} />
					<Route exact path="/chat/:id" render={ (props) => {
						return <Chat socket={this.socket} {...props} />
					}} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;