/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';


const TitleText = ({titleText, center, styles}) => {

	const defaultClassName = "col-md-12";

	const className = center ? `${defaultClassName} text-center` : defaultClassName;

	return(
		<div className={className} style={styles}>
			<h1><strong>{titleText}</strong></h1>
		</div>
	);
};

TitleText.propTypes = {
	titleText: PropTypes.string.isRequired,
	center: PropTypes.bool,
	styles: PropTypes.object
};

TitleText.defaultProps = {
	center: false,
	styles: {}
};

export default TitleText;