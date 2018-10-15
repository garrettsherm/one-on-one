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
/*** Searching Components */
import SearchingInfo from '../SearchingInfo/SearchingInfo';

/** CSS */
import './SearchingApp.css';

/** Main Presentational component for Searching Page*/
const SearchingApp = ({count}) => (
	<div className="searching-container">
		<VerticalCenter>
			<Container>
				<Row>
					<TitleText titleText="Searching..." center={true} styles={{color: '#ffffff'}}/>
					<div className="col-md-8 offset-md-2 text-center">
						<SearchingInfo count={count} />
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