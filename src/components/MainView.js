import React from 'react';
import PropTypes from 'prop-types';
import {mainViewBorderRadius} from '../constants/constants';

const MainView = ({mainViewImage}) => (
	<img
		src={require(`../assets/images/mainViews/${mainViewImage}.png`)}
		style={{
			borderRadius: mainViewBorderRadius
		}}
		alt=""
	/>
);

MainView.propTypes = {
	mainViewImage: PropTypes.string.isRequired
};

export default MainView;