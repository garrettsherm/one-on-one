/* src/router/Router.js */

/** Node Modules */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

/** Components */
/*** Page Components */
import FindChat from '../pages/FindChat/FindChat';
import Searching from '../pages/Searching/Searching';
import NotFound from '../pages/NotFound/NotFound';
import Chat from '../pages/Chat/Chat';


/**
 * @name Router
 * @class
 * @extends Component
 * @description 	Router Component for one-on-one app. This is the component that index.js renders
 *								Uses react router v4			
*/
class Router extends Component {

	/*
	 * @name socket
	 * @description Connect to socket io server. 
	 *
	 * If development environment connect to localhost:3001
	 * Else connect to '', which will default to url
	*/
	socket = io.connect(process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={ (props) => (
						<FindChat socket={this.socket} {...props} /> 
					)} />
					<Route exact path="/searching" render={ (props) => ( 
						<Searching socket={this.socket} {...props} /> 
					)} />
					<Route exact path="/chat/:id" render={ (props) => (
						<Chat socket={this.socket} {...props} />
					)} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;