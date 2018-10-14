/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';


const TitleText = ({titleText, center}) => {

	const defaultClassName = "col-md-12";

	const className = center ? `${defaultClassName} text-center` : defaultClassName;

	return(
		<div className={className}>
			<h1><strong>{titleText}</strong></h1>
		</div>
	);
};

TitleText.propTypes = {
	titleText: PropTypes.string.isRequired,
	center: PropTypes.bool
};

TitleText.defaultProps = {
	center: false
};

export default TitleText;