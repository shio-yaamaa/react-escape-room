import React from 'react';
import PropTypes from 'prop-types';
import {mainViewImages} from '../utils/AssetsLoader';
import {mainScreenWidth, mainScreenHeight, screenBorderRadius} from '../constants/constants';

const MainView = ({mainViewImage}) => (
	<img
    width={mainScreenWidth}
    height={mainScreenHeight}
		src={mainViewImages[mainViewImage].src}
		style={{
			borderRadius: screenBorderRadius
		}}
		alt=""
	/>
);

MainView.propTypes = {
	mainViewImage: PropTypes.string.isRequired
};

export default MainView;
