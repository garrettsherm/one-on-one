/* src/components/commons/Row/Row.js */

/* Requires Bootstrap */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({fluid, children}) => {

	const className = fluid ? 'row-fluid' : 'row';

	return(
		<div className={className} >
			{children}
		</div>
	);
}

Row.propTypes = {
	fluid: PropTypes.bool,
	children: PropTypes.node
};

Row.defaultProps = {
	fluid: false
};

export default Row;