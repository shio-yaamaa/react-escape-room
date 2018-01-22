import React from 'react';
import PropTypes from 'prop-types';
import {mainViewBorderRadius} from '../constants/constants';
import {mainViewImages} from '../utils/AssetsLoader';

const MainView = ({mainViewImage}) => (
	<img
		src={mainViewImages[mainViewImage].src}
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