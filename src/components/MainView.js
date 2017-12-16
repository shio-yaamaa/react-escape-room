import React from 'react';
import PropTypes from 'prop-types';

const MainView = ({mainViewImage}) => (
	<img
		src={require(`../assets/images/mainViews/${mainViewImage}.png`)}
		style={{
			borderRadius: 12
		}}
		alt=""
	/>
);

MainView.propTypes = {
	mainViewImage: PropTypes.string.isRequired
};

export default MainView;