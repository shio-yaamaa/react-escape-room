import React from 'react';
import PropTypes from 'prop-types';
import getPixelRgb from '../utils/getPixelRgb';
import rgbToHex from '../utils/rgbToHex';
import hexToColorName from '../utils/hexToColorName';
import {itemDetailMapImages} from '../utils/AssetsLoader';
import {itemDetailWindowWidth, itemDetailWindowHeight, itemDetailWindowBorderWidth} from '../constants/constants';

class ItemDetailViewMap extends React.Component {
	setMap(filename, context) {
    context.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
		context.drawImage(itemDetailMapImages[filename], 0, 0, this.canvasSize[0], this.canvasSize[1]);
		this.pixelsData = context.getImageData(
			0, 0,
			this.canvasSize[0], this.canvasSize[1]
		).data;
	}

	componentDidMount() {
		this.canvasSize = [this.canvas.width, this.canvas.height];
		this.setMap(this.props.itemDetailMapImage, this.canvas.getContext('2d'));
	}

	shouldComponentUpdate(nextProps) {
		this.setMap(nextProps.itemDetailMapImage, this.canvas.getContext('2d'));
		return false;
	}

	sendClickedColor(event) {
		const rect = event.target.getBoundingClientRect();
		const pixelRgb = getPixelRgb(
			this.pixelsData,
			[event.clientX - rect.left, event.clientY - rect.top], // coordinate
			this.canvasSize
		);
		this.props.onItemDetailViewClick(hexToColorName(rgbToHex(pixelRgb)));
	}

	render() {
		return (
			<canvas
				ref={canvas => this.canvas = canvas}
				width={itemDetailWindowWidth - itemDetailWindowBorderWidth * 2}
				height={itemDetailWindowHeight - itemDetailWindowBorderWidth * 2}
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

ItemDetailViewMap.propTypes = {
	itemDetailMapImage: PropTypes.string.isRequired,
	onItemDetailViewClick: PropTypes.func.isRequired
};

export default ItemDetailViewMap;
