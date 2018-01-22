import React from 'react';
import PropTypes from 'prop-types';

class MainViewOverlay extends React.Component {
	constructor(props) {
		super(props);
		this.mainViewOverlayImages = {};

		// load dial images
		for (let i = 0; i < 10; i++) {
			const imageName = 'dial' + i;
			this.mainViewOverlayImages[imageName] = new Image();
			this.mainViewOverlayImages[imageName].src = require(`../assets/images/mainViewOverlays/${imageName}.svg`);
		}
	}

	shouldComponentUpdate(nextProps) {
		const context = this.canvas.getContext('2d'); // componentDidMountでやっても使いまわしできない

		// reset
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// draw
		nextProps.mainViewOverlays.forEach((overlay) => {
			const image = this.mainViewOverlayImages[overlay.image];
			const pos = [
				overlay.isCenterPos ? overlay.pos[0] - image.width * overlay.scale / 2 : overlay.pos[0],
				overlay.isCenterPos ? overlay.pos[1] - image.height * overlay.scale / 2 : overlay.pos[1]
			];
			context.drawImage(
				image,
				pos[0], pos[1],
				image.width * overlay.scale, image.height * overlay.scale
			);
		});
		return false;
	}

	render() {
		return (
			<canvas
				ref={canvas => this.canvas = canvas}
				style={{
					position: 'absolute',
					top: 0,
					left: 0
				}}
				width={480}
				height={380}
			></canvas>
		);
	}
}

MainViewOverlay.propTypes = {
	mainViewOverlays: PropTypes.arrayOf(
		PropTypes.shape({
      image: PropTypes.string,
      pos: PropTypes.arrayOf(PropTypes.number),
      isCenterPos: PropTypes.bool,
      scale: PropTypes.number
    })
	).isRequired
};

export default MainViewOverlay;