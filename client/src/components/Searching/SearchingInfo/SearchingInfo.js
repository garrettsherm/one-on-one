/* src/components/Searching/SearchingInfo/SearchingInfo.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** CSS */
import './SearchingInfo.css';

/** Main Presentational component for Searching Page*/
const SearchingInfo = ({count}) => (
	<div className="searching-info-container">
		<p><strong>{count}</strong> person searching for chat</p>
		<p className="searching-info-container__hint">
			<i>No one else online? Open this site in a new tab to test it out!</i>
		</p>
	</div>
);

/** PropTypes */
SearchingInfo.propTypes = {
	count: PropTypes.number.isRequired
};

export default SearchingInfo;