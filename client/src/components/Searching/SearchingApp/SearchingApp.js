/* src/components/Searching/SearchingApp/SearchingApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Main Presentational component for Searching Page*/
const SearchingApp = ({count}) => (
	<div className="container">
		<div className="row">
			<div className="col-md-6 offset-md-3 text-center">
				<h1><strong>Searching for a game</strong></h1>
				<p><strong>{count}</strong> person searching for chat</p>
				<p><i>No one else online? Open this site in a new tab to test it out!</i></p>
			</div>
		</div>
	</div>
);

/** PropTypes */
SearchingApp.propTypes = {
	count: PropTypes.number.isRequired
};

export default SearchingApp;