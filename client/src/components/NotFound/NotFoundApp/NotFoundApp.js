/* src/components/NotFound/NotFoundApp/NotFoundApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** wrappers Components */
import Container from '../../wrappers/Container/Container';
import Row from '../../wrappers/Row/Row';
import VerticalCenter from '../../wrappers/VerticalCenter/VerticalCenter';
/*** commons Components */
import TitleText from '../../commons/TitleText/TitleText';

/** CSS */
import './NotFoundApp.css';

/** Main Presentational component for NotFound Page*/
const NotFoundApp = ({notFoundTitle}) => (
	<div className="not-found-container">
		<VerticalCenter>
			<Container>
				<Row>
					<TitleText titleText={notFoundTitle} center={true} styles={{color: '#ffffff'}} />
				</Row>
			</Container>
		</VerticalCenter>
	</div>
);

/** PropTypes */
NotFoundApp.propTypes = {
	notFoundTitle: PropTypes.string.isRequired
};


export default NotFoundApp;