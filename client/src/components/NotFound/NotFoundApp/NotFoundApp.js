/* src/components/NotFound/NotFoundApp/NotFoundApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** common Components */
import TitleText from '../../commons/TitleText/TitleText';

/** Main Presentational component for NotFound Page*/
const NotFoundApp = ({notFoundTitle}) => (
	<TitleText titleText={notFoundTitle} />
);

/** PropTypes */
NotFoundApp.propTypes = {
	notFoundTitle: PropTypes.string.isRequired
};


export default NotFoundApp;