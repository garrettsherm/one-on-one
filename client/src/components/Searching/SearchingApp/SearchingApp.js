/* src/components/Searching/SearchingApp/SearchingApp.js */

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
import './SearchingApp.css';

/** Main Presentational component for Searching Page*/
const SearchingApp = ({count}) => (
	<div className="searching-container">
		<VerticalCenter>
			<Container>
				<Row>
					<TitleText titleText="Searching for Someone to Chat With" center={true} styles={{color: '#ffffff'}}/>
					<div className="col-md-6 offset-md-3 text-center searching-container__info">
						<p><strong>{count}</strong> person searching for chat</p>
						<p className="searching-container__info__hint">
							<i>No one else online? Open this site in a new tab to test it out!</i>
						</p>
					</div>
				</Row>
			</Container>
		</VerticalCenter>
	</div>
);

/** PropTypes */
SearchingApp.propTypes = {
	count: PropTypes.number.isRequired
};

export default SearchingApp;