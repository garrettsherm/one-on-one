/* src/components/commons/Container/Container.js */

/* Requires Bootstrap */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

const Container = ({fluid, children}) => {

	const className = fluid ? 'container-fluid' : 'container';

	return(
		<div className={className} >
			{children}
		</div>
	);
}

Container.propTypes = {
	fluid: PropTypes.bool,
	children: PropTypes.node
};

Container.defaultProps = {
	fluid: false
};

export default Container;