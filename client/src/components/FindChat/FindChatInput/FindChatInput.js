/* src/components/FindChat/FindChatInput/FindChatInput.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
/*** buttons Components */
import MainButton from '../../buttons/MainButton/MainButton';

/** CSS */
import './FindChatInput.css';

/** Main Presentational component for FindChat Page*/
const FindChatInput = ({handleFind, handleNameChange, name}) => (
	<form onSubmit={ e => handleFind(e) } className='find-chat-input-form'>
		<div className="form-group">
			<label>Enter Name</label>
			<input className="form-control" type="text" onChange={ e => handleNameChange(e) } name="name" value={name} />
		</div>
		<MainButton onClick={ e => handleFind(e) } buttonText="Find Someone" />
	</form>
);

/** PropTypes */
FindChatInput.propTypes = {
	handleFind: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default FindChatInput;