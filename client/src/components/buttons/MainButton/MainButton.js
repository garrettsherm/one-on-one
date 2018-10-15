/* src/components/buttons/MainButton/MainButton.js */

/* Requires Bootstrap */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** CSS */
import './MainButton.css';

/** Presentation component for MainButton */
const MainButton = ({buttonText, onClick, styles}) => (
	<button onClick={onClick} className="btn btn-primary main-button" style={styles}>
		{buttonText}
	</button>
);

/** PropTypes */
MainButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	styles: PropTypes.object
};

/** Default Props */
MainButton.defaultProps = {
	styles: {}
};

export default MainButton;