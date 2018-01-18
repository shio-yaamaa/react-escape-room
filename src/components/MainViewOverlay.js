import React from 'react';
import PropTypes from 'prop-types';

class MainViewOverlay extends React.Component {
	shouldComponentUpdate(nextProps) {
		const context = this.canvas.getContext('2d'); // componentDidMountでやっても使いまわしできない

		// reset
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// draw
		nextProps.mainViewOverlays.forEach((overlay) => {
			const image = new Image();
			image.onload = () => {
				context.drawImage(
					image,
					overlay.pos[0], overlay.pos[1],
					image.width * overlay.scale, image.height * overlay.scale
				);
			};
			image.src = require(`../assets/images/mainViewOverlays/${overlay.image}.png`);
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
      scale: PropTypes.number
    })
	).isRequired
};

export default MainViewOverlay;