/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';


const TitleText = ({titleText}) => (
	<div>
		<h1>{titleText}</h1>
	</div>
);

TitleText.propTypes = {
	titleText: PropTypes.string.isRequired
};

export default TitleText;