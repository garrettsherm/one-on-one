/* src/components/FindChat/FindChatApp/FindChatApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** wrappers Components */
import Container from '../../wrappers/Container/Container';
import Row from '../../wrappers/Row/Row';
/*** commons Components */
import TitleText from '../../commons/TitleText/TitleText';
/*** FindChat Components */
import FindChatInput from '../FindChatInput/FindChatInput';

/** Main Presentational component for FindChat Page*/
const FindChatApp = ({handleFind, handleNameChange, name}) => (
	<Container>
		<Row>
			<TitleText titleText="Find Chat" center={true} />
			<div className="col-md-6 offset-md-3 text-center">
				<FindChatInput handleFind={handleFind} handleNameChange={handleNameChange} name={name} />
			</div>
		</Row>
	</Container>
);

/** PropTypes */
FindChatApp.propTypes = {
	handleFind: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default FindChatApp;