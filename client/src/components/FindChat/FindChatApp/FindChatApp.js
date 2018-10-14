/* src/components/FindChat/FindChatApp/FindChatApp.js */

/** Node Modules */
import React from 'react';
import PropTypes from 'prop-types';

/** Main Presentational component for FindChat Page*/
const FindChatApp = ({handleFind, handleNameChange, name}) => (
	<div className="container">
		<div className="row">
			<div className="col-md-12 text-center">
				<h1><strong>FindChat</strong></h1>
			</div>
			<div className="col-md-6 offset-md-3 text-center">
				<form onSubmit={ e => handleFind(e) }>
					<div className="form-group">
						<label>Enter Name</label>
						<input className="form-control" type="text" onChange={ e => handleNameChange(e) } name="name" value={name} />
					</div>
					<button className="btn btn-primary" onClick={ e => handleFind(e) }>Find Someone</button>
				</form>
			</div>
		</div>
	</div>
);

/** PropTypes */
FindChatApp.propTypes = {
	handleFind: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default FindChatApp;