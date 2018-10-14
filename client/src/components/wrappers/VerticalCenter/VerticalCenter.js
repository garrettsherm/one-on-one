/* src/components/commons/VerticalCenter/VerticalCenter.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** CSS */
import './VerticalCenter.css';

const VerticalCenter = ({children}) => {
	return(
		<div className="vertical-center-container" >
			{children}
		</div>
	);
}

VerticalCenter.propTypes = {
	children: PropTypes.node
};

export default VerticalCenter;