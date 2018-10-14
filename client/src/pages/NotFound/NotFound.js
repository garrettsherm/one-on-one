/* src/pages/FindChat/FindChat.js */

/** Node modules */
import React, { Component } from 'react';

/** Components */
/***  NotFound Components */
import NotFoundApp from '../../components/NotFound/NotFoundApp/NotFoundApp';

/**
 * @name NotFound
 * @class
 * @extends Component
 * @description 	Logic component for NotFound Page
*/
class NotFound extends Component {

	/** Default State */
	state = {
		notFoundTitle: 'Not Found'
	};

	render(){
		return(<NotFoundApp notFoundTitle={this.state.notFoundTitle} />);
	}
}

export default NotFound;