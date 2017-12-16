import React from 'react';
import PropTypes from 'prop-types';
import getPixelRgb from '../utils/getPixelRgb';
import rgbToHex from '../utils/rgbToHex';
import hexToColorName from '../utils/hexToColorName';

class MainViewMap extends React.Component {
	setImageSrc(imageSrc) {
		this.image.src = require(
			`../assets/images/mainViewMaps/${imageSrc}.png`
		);
	}

	componentDidMount() {
		this.canvasSize = [this.canvas.width, this.canvas.height];
		const context = this.canvas.getContext('2d');
		this.image = new Image();
		this.image.onload = () => {
			context.drawImage(this.image, 0, 0);
			this.pixelsData = context.getImageData(
				0, 0,
				this.canvasSize[0], this.canvasSize[1]
			).data;
		};
		this.setImageSrc(this.props.mainViewMapImage);
	}

	shouldComponentUpdate(nextProps) {
		this.setImageSrc(nextProps.mainViewMapImage);
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
				width={480}
				height={380}
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