/* src/components/FindChat/FindChatInput/FindChatInput.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Main Presentational component for FindChat Page*/
const FindChatInput = ({handleFind, handleNameChange, name}) => (
	<form onSubmit={ e => handleFind(e) }>
		<div className="form-group">
			<label>Enter Name</label>
			<input className="form-control" type="text" onChange={ e => handleNameChange(e) } name="name" value={name} />
		</div>
		<button className="btn btn-primary" onClick={ e => handleFind(e) }>Find Someone</button>
	</form>
);

/** PropTypes */
FindChatInput.propTypes = {
	handleFind: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default FindChatInput;