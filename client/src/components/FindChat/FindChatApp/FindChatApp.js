/* src/components/FindChat/FindChatApp/FindChatApp.js */

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
/*** FindChat Components */
import FindChatInput from '../FindChatInput/FindChatInput';

/** CSS */
import './FindChatApp.css';

/** Main Presentational component for FindChat Page*/
const FindChatApp = ({handleFind, handleNameChange, name}) => (
	<div className="find-chat-container">
		<VerticalCenter>
			<Container>
				<Row>
					<TitleText titleText="Find Someone to Chat With" center={true} styles={{color: '#ffffff'}}/>
					<div className="col-md-6 offset-md-3 text-center find-chat-input-container">
						<FindChatInput handleFind={handleFind} handleNameChange={handleNameChange} name={name} />
					</div>
				</Row>
			</Container>
		</VerticalCenter>
	</div>
);

/** PropTypes */
FindChatApp.propTypes = {
	handleFind: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default FindChatApp;