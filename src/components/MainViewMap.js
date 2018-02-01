import React from 'react';
import PropTypes from 'prop-types';
import getPixelRgb from '../utils/getPixelRgb';
import rgbToHex from '../utils/rgbToHex';
import hexToColorName from '../utils/hexToColorName';
import {mainViewMapImages} from '../utils/AssetsLoader';
import {mainScreenWidth, mainScreenHeight} from '../constants/constants';

class MainViewMap extends React.Component {
	setMap(filename, context) {
    context.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
		context.drawImage(mainViewMapImages[filename], 0, 0, this.canvasSize[0], this.canvasSize[1]);
		this.pixelsData = context.getImageData(
			0, 0,
			this.canvasSize[0], this.canvasSize[1]
		).data;
	}

	componentDidMount() {
		this.canvasSize = [this.canvas.width, this.canvas.height];
		this.setMap(this.props.mainViewMapImage, this.canvas.getContext('2d'));
	}

	shouldComponentUpdate(nextProps) {
		this.setMap(nextProps.mainViewMapImage, this.canvas.getContext('2d'));
		return false;
	}

	sendClickedColor(event) {
		const rect = event.target.getBoundingClientRect();
		const pixelRgb = getPixelRgb(
			this.pixelsData,
			[event.clientX - rect.left, event.clientY - rect.top], // coordinate
			this.canvasSize
		);
		this.props.onMainViewClick(hexToColorName(rgbToHex(pixelRgb)));
	}

	render() {
		return (
			<canvas
				ref={canvas => this.canvas = canvas}
				width={mainScreenWidth}
				height={mainScreenHeight}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: 0
				}}
				onClick={(event) => this.sendClickedColor(event)}
			></canvas>
		);
	}
}

MainViewMap.propTypes = {
	mainViewMapImage: PropTypes.string.isRequired,
	onMainViewClick: PropTypes.func.isRequired
};

export default MainViewMap;
